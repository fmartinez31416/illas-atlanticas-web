import { useState } from 'react';
import { PuenteGate } from './PuenteGate';
import { DashboardNautico } from './DashboardNautico';
import { startOcean, stopOcean } from '../lib/oceanSound';

interface PuenteViewProps {
  onBackHome: () => void;
  onOpenBooking: () => void;
}

// Flujo completo: la puerta (con sonido / en silencio) → el puente de mando
export function PuenteView({ onBackHome, onOpenBooking }: PuenteViewProps) {
  const [aBordo, setABordo] = useState(false);

  if (!aBordo) {
    return (
      <PuenteGate
        onEnter={(conSonido) => {
          if (conSonido) startOcean();
          setABordo(true);
        }}
        onVolverCasa={onBackHome}
      />
    );
  }

  return (
    <DashboardNautico
      onBack={() => {
        stopOcean();
        setABordo(false);
      }}
      onOpenBooking={onOpenBooking}
    />
  );
}

export default PuenteView;
