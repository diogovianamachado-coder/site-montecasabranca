<?php
// Monte Casa Branca · tarifa privada 2026/2027 e a conta da estadia (a mesma regra da app, lib/motor.php → orcamento()).
// Portado de lovable/src/lib/tarifas.ts (Claude, 25/10/2026). Em produção a porta #190 (site_tarifa.php) é a fonte;
// esta conta serve quando a app não responde e como espelho para testes. Devolve a mesma forma da porta #190.
declare(strict_types=1);

final class Tarifas
{
    public const PAX_MAX = 8;
    public const REGRAS = ['Entrada a partir das 16h', 'Saída até às 11h'];
    public const MENSAL = ['valor' => 4000, 'noites' => 28, 'meses' => [11, 12, 1, 2, 3]];

    private static function epocas(int $inicioVerao, int $verao, int $setembro): array
    {
        return [
            ['nome' => 'Inverno', 'ini' => [1, 1], 'fim' => [2, 29], 'noite' => 250, 'min' => 2],
            ['nome' => 'Primavera', 'ini' => [3, 1], 'fim' => [5, 1], 'noite' => 280, 'min' => 2],
            ['nome' => 'Maio', 'ini' => [5, 2], 'fim' => [5, 31], 'noite' => 330, 'min' => 2],
            ['nome' => 'Início do verão', 'ini' => [6, 1], 'fim' => [7, 17], 'noite' => $inicioVerao, 'min' => 2],
            ['nome' => 'Verão', 'ini' => [7, 18], 'fim' => [8, 31], 'noite' => $verao, 'min' => 7, 'sabado' => true],
            ['nome' => 'Setembro', 'ini' => [9, 1], 'fim' => [9, 30], 'noite' => $setembro, 'min' => 2],
            ['nome' => 'Outono', 'ini' => [10, 1], 'fim' => [11, 30], 'noite' => 250, 'min' => 2],
            ['nome' => 'Dezembro', 'ini' => [12, 1], 'fim' => [12, 31], 'noite' => 330, 'min' => 2],
        ];
    }

    /** Tarifa privada por ano (= a do site, a mais baixa de todos os canais). */
    public static function anos(): array
    {
        return [
            2026 => ['limpeza' => 170, 'epocas' => self::epocas(380, 405, 330)],
            2027 => ['limpeza' => 180, 'epocas' => self::epocas(390, 410, 340)],
        ];
    }

    public static function isoValido(string $s): bool
    {
        if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $s, $m)) return false;
        return checkdate((int)$m[2], (int)$m[3], (int)$m[1]);
    }

    private static function dt(string $iso): DateTimeImmutable
    {
        return new DateTimeImmutable($iso . ' 12:00:00', new DateTimeZone('Europe/Lisbon'));
    }

    public static function epocaDe(string $iso): ?array
    {
        $d = self::dt($iso);
        $ano = (int)$d->format('Y');
        $anos = self::anos();
        $chaves = array_keys($anos);
        sort($chaves);
        $usado = $ano;
        $aviso = null;
        if (!isset($anos[$ano])) {
            $usado = $ano < $chaves[0] ? $chaves[0] : $chaves[count($chaves) - 1];
            $aviso = "A tarifa de $ano ainda não está publicada; a estimativa usa a de $usado.";
        }
        $t = $anos[$usado];
        $md = (int)$d->format('n') * 100 + (int)$d->format('j');
        foreach ($t['epocas'] as $e) {
            $ini = $e['ini'][0] * 100 + $e['ini'][1];
            $fim = $e['fim'][0] * 100 + $e['fim'][1];
            if ($md >= $ini && $md <= $fim) {
                return ['nome' => $e['nome'], 'noite' => $e['noite'], 'min_noites' => $e['min'], 'sabado_a_sabado' => !empty($e['sabado']),
                    'ano_tarifa' => $usado, 'limpeza' => $t['limpeza'], 'aviso' => $aviso];
            }
        }
        return null;
    }

    private static function falha(array $R, string $erro, string $msg): array
    {
        $R['ok'] = false; $R['erro'] = $erro; $R['mensagem'] = $msg;
        return $R;
    }

    public static function euros(float $v): string
    {
        $s = number_format($v, fmod($v, 1.0) ? 2 : 0, ',', "\u{00A0}");
        return $s . "\u{00A0}€";
    }

    /** A conta do site: mesma forma da resposta da porta #190 (contrato_portas_v1.md §2). */
    public static function orcamento(string $entrada, string $saida, int $pax, ?DateTimeImmutable $hoje = null): array
    {
        $R = ['ok' => false, 'entrada' => $entrada, 'saida' => $saida, 'pax' => $pax, 'avisos' => [], 'regras' => self::REGRAS, 'fonte' => 'site'];
        if (!self::isoValido($entrada) || !self::isoValido($saida)) return self::falha($R, 'datas', 'Escolham a data de entrada e a de saída.');
        $de = self::dt($entrada); $ate = self::dt($saida);
        $n = (int)$de->diff($ate)->format('%r%a');
        if ($n <= 0) return self::falha($R, 'datas', 'A saída tem de ser depois da entrada.');
        if ($n > 60) return self::falha($R, 'datas', 'Para estadias com mais de 60 noites, falem connosco.');
        $hoje = $hoje ?? new DateTimeImmutable('today 12:00:00', new DateTimeZone('Europe/Lisbon'));
        if ($de < $hoje) return self::falha($R, 'passado', 'A data de entrada já passou.');
        if ($pax < 1 || $pax > self::PAX_MAX) return self::falha($R, 'pax', 'A casa recebe até ' . self::PAX_MAX . ' pessoas.');
        $R['noites'] = $n;
        $ep0 = self::epocaDe($entrada);
        if (!$ep0) return self::falha($R, 'sem_tarifa', 'Não temos tarifa para estas datas; falem connosco.');
        if ($ep0['aviso']) $R['avisos'][] = $ep0['aviso'];
        $dormidas = 0.0; $verao = false; $mensalPossivel = true; $detalhe = [];
        $dia = $de;
        for ($i = 0; $i < $n; $i++) {
            $ep = self::epocaDe($dia->format('Y-m-d')) ?? $ep0;
            $dormidas += $ep['noite'];
            $detalhe[] = ['dia' => $dia->format('Y-m-d'), 'epoca' => $ep['nome'], 'noite' => $ep['noite']];
            if ($ep['sabado_a_sabado']) $verao = true;
            if (!in_array((int)$dia->format('n'), self::MENSAL['meses'], true)) $mensalPossivel = false;
            $dia = $dia->modify('+1 day');
        }
        $R['epoca'] = $ep0['nome']; $R['noite'] = $ep0['noite']; $R['min_noites'] = $ep0['min_noites']; $R['detalhe'] = $detalhe;
        if ($verao) {
            $e = (int)$de->format('w'); $s = (int)$ate->format('w');
            if ($n < 7 || $e !== 6 || $s !== 6) {
                $R['min_noites'] = 7;
                return self::falha($R, 'verao_sabado', 'No verão (18 de julho a 31 de agosto) as estadias são de sábado a sábado, 7 noites ou mais.');
            }
        } elseif ($n < $ep0['min_noites']) {
            return self::falha($R, 'min_noites', 'Nesta época o mínimo são ' . $ep0['min_noites'] . ' noites.');
        }
        if ($n >= self::MENSAL['noites'] && $mensalPossivel) {
            $dormidas = round(self::MENSAL['valor'] / self::MENSAL['noites'] * $n, 2);
            $R['mensal'] = true;
            $R['avisos'][] = 'Estadia longa: aplica-se o preço mensal (' . self::euros(self::MENSAL['valor']) . ' por ' . self::MENSAL['noites'] . ' noites) mais a limpeza.';
        }
        $R['limpeza'] = $ep0['limpeza'];
        $R['dormidas'] = round($dormidas, 2);
        $R['total'] = round($R['dormidas'] + $R['limpeza'], 2);
        // A saída tardia (quando ninguém entra no dia da saída) é dita pelo painel do site, que conhece o calendário:
        // conteudo.php → 'disponibilidade' → 'saida_tardia', com a hora de inc/factos.php. Sem pôr do sol (Diogo, 15/11/2026).
        $R['ok'] = true;
        $R['calculado_em'] = (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format(DATE_ATOM);
        return $R;
    }
}
