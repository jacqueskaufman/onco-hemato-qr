import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, UserRound, Building2, AlertTriangle, ClipboardCheck } from 'lucide-react';

const diseases = [
  {
    id: 'leucemias',
    color: 'bg-red-600',
    label: '🔴 Leucemias agudas / LPA',
    short: 'Leucemias agudas / LPA',
    summary: 'Aqui entra o one page já validado de leucemias agudas e LPA.',
  },
  {
    id: 'linfomas',
    color: 'bg-orange-500',
    label: '🟠 Linfomas',
    short: 'Linfomas',
    summary: 'Aqui entra o one page já validado de linfomas.',
  },
  {
    id: 'mieloma',
    color: 'bg-yellow-500',
    label: '🟡 Mieloma múltiplo',
    short: 'Mieloma múltiplo',
    summary: 'Aqui entra o one page já validado de mieloma múltiplo.',
  },
  {
    id: 'citopenias',
    color: 'bg-green-600',
    label: '🟢 Citopenias / SMD',
    short: 'Citopenias / SMD',
    summary: 'Aqui entra o one page já validado de citopenias e mielodisplasia.',
  },
  {
    id: 'mpn',
    color: 'bg-blue-600',
    label: '🔵 MPN / LMC',
    short: 'MPN / LMC',
    summary: 'Aqui entra o one page já validado de neoplasias mieloproliferativas e LMC.',
  },
];

function HomeScreen({ onSelect }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-md">
        <Card className="rounded-3xl shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="rounded-full px-3 py-1 text-sm">Acesso rápido</Badge>
            </div>
            <CardTitle className="text-2xl leading-tight">
              Suspeita de Neoplasia Onco-Hematológica – Emergência
            </CardTitle>
            <p className="text-sm text-slate-600 mt-2">
              Escolha o cenário clínico para abrir o one page correspondente.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {diseases.map((item) => (
              <Button
                key={item.id}
                onClick={() => onSelect(item.id)}
                className={`w-full h-auto py-4 justify-start rounded-2xl text-left whitespace-normal ${item.color}`}
              >
                <span className="text-base font-medium">{item.label}</span>
              </Button>
            ))}
            <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
              Após a leitura do one page, registrar <strong>nome do paciente</strong> e <strong>setor</strong> para conversão.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OnePageScreen({ disease, onBack, onAdvance }) {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-4">
        <Button variant="outline" onClick={onBack} className="rounded-2xl">
          <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>

        <Card className="rounded-3xl shadow-lg border-0 overflow-hidden">
          <div className={`h-3 ${disease.color}`} />
          <CardHeader>
            <CardTitle className="text-2xl">{disease.short}</CardTitle>
            <p className="text-sm text-slate-600">
              One page clínico para consulta rápida do emergencista.
            </p>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-dashed p-6 bg-white">
              <p className="text-slate-700 leading-7">
                {disease.summary}
              </p>
              <p className="text-sm text-slate-500 mt-4">
                Substituir este bloco pelo conteúdo final já aprovado de cada patologia.
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 flex gap-3">
              <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
              <div>
                Ao final da consulta, registrar o paciente e o setor para permitir rastreio de conversão e encaminhamento.
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={onAdvance} className="rounded-2xl px-6">
                Registrar paciente e setor
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ConversionScreen({ disease, onBack }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    patientName: '',
    sector: '',
    physician: '',
    suspicion: disease.short,
    notes: '',
  });

  const isValid = useMemo(() => form.patientName.trim() && form.sector.trim(), [form]);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-xl space-y-4">
        <Button variant="outline" onClick={onBack} className="rounded-2xl">
          <ChevronLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>

        <Card className="rounded-3xl shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6" /> Identificação para conversão
            </CardTitle>
            <p className="text-sm text-slate-600">
              Preencha os dados mínimos após visualizar o one page de <strong>{disease.short}</strong>.
            </p>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="patientName" className="flex items-center gap-2">
                    <UserRound className="w-4 h-4" /> Número do prontuário
                  </Label>
                  <Input
                    id="patientName"
                    value={form.patientName}
                    onChange={(e) => updateField('patientName', e.target.value)}
                    placeholder="Ex.: 123456"
                    className="rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> (Removido)
                  </Label>
                  <Input
                    id="sector"
                    value={form.sector}
                    onChange={(e) => updateField('sector', e.target.value)}
                    placeholder="Ex.: Emergência adulto, ambulatório, enfermaria"
                    className="rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="physician">Médico solicitante</Label>
                  <Input
                    id="physician"
                    value={form.physician}
                    onChange={(e) => updateField('physician', e.target.value)}
                    placeholder="Opcional"
                    className="rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suspicion">Suspeita principal</Label>
                  <Input
                    id="suspicion"
                    value={form.suspicion}
                    onChange={(e) => updateField('suspicion', e.target.value)}
                    className="rounded-2xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações clínicas</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    placeholder="Opcional: blastos, DHL alto, massa mediastinal, hipercalcemia, etc."
                    className="rounded-2xl min-h-28"
                  />
                </div>

                <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                  Campo mínimo obrigatório: <strong>número do prontuário</strong>.
                </div>

                <Button type="submit" disabled={!isValid} className="w-full rounded-2xl h-11">
                  Confirmar registro
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
                  <h3 className="font-semibold text-emerald-900">Registro concluído</h3>
                  <p className="text-sm text-emerald-800 mt-2">
                    Paciente <strong>{form.patientName}</strong> registrado no setor <strong>{form.sector}</strong> com suspeita de <strong>{form.suspicion}</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border p-4 text-sm bg-white space-y-2">
                  <div><strong>Paciente:</strong> {form.patientName}</div>
                  <div><strong>(Removido):</strong> {form.sector}</div>
                  <div><strong>Médico:</strong> {form.physician || 'Não informado'}</div>
                  <div><strong>Suspeita:</strong> {form.suspicion}</div>
                  <div><strong>Observações:</strong> {form.notes || 'Sem observações'}</div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-2xl flex-1">
                    Editar
                  </Button>
                  <Button onClick={() => window.location.reload()} className="rounded-2xl flex-1">
                    Novo acesso
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function QrOncoHematologiaFluxo() {
  const [screen, setScreen] = useState('home');
  const [selectedId, setSelectedId] = useState(null);

  const selectedDisease = diseases.find((d) => d.id === selectedId);

  if (screen === 'home') {
    return (
      <HomeScreen
        onSelect={(id) => {
          setSelectedId(id);
          setScreen('onepage');
        }}
      />
    );
  }

  if (screen === 'onepage' && selectedDisease) {
    return (
      <OnePageScreen
        disease={selectedDisease}
        onBack={() => setScreen('home')}
        onAdvance={() => setScreen('conversion')}
      />
    );
  }

  if (screen === 'conversion' && selectedDisease) {
    return (
      <ConversionScreen
        disease={selectedDisease}
        onBack={() => setScreen('onepage')}
      />
    );
  }

  return null;
}
