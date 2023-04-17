type AnticipatorConfig = {
  columnSize: number; // número de colunas da máquina caça-níqueis
  minToAnticipate: number; // número mínimo de símbolos para começar a antecipar
  maxToAnticipate: number; // número máximo de símbolos para terminar a antecipação
  anticipateCadence: number; // valor de cadência quando há antecipação
  defaultCadence: number; // valor de cadência quando não há antecipação
};

type SlotCoordinate = {
  column: number; // número da coluna
  row: number; // número da linha
};

type SpecialSymbol = { specialSymbols: Array<SlotCoordinate> }; // objeto que contém uma matriz de coordenadas dos símbolos especiais

type RoundsSymbols = {
  roundOne: SpecialSymbol; // símbolos especiais para a rodada 1
  roundTwo: SpecialSymbol; // símbolos especiais para a rodada 2
  roundThree: SpecialSymbol; // símbolos especiais para a rodada 3
};

type SlotCadence = Array<number>; // matriz que contém a cadência da coluna

type RoundsCadences = {
  roundOne: SlotCadence; // matriz que contém a cadência para a rodada 1
  roundTwo: SlotCadence; // matriz que contém a cadência para a rodada 2
  roundThree: SlotCadence; // matriz que contém a cadência para a rodada 3
};

/**
 * Configuração do Anticipador. Possui todas as informações necessárias para verificar a antecipação.
 * @param columnSize É o número de colunas que a máquina caça-níqueis possui.
 * @param minToAnticipate É o número mínimo de símbolos para começar a antecipação.
 * @param maxToAnticipate É o número máximo de símbolos para terminar a antecipação.
 * @param anticipateCadence É o valor de cadência quando há antecipação.
 * @param defaultCadence É o valor de cadência quando não há antecipação.
 */
const anticipatorConfig: AnticipatorConfig = {
  columnSize: 5,
  minToAnticipate: 2,
  maxToAnticipate: 3,
  anticipateCadence: 2,
  defaultCadence: 0.25,
};

/**
 * Rodadas do jogo com a posição dos símbolos especiais que devem ser usados para gerar as cadências da máquina caça-níqueis.
 */
const gameRounds: RoundsSymbols = {
  roundOne: {
    specialSymbols: [
      { column: 0, row: 2 }, // coordenadas do símbolo especial na coluna 0 e linha 2
      { column: 1, row: 3 }, // coordenadas do símbolo especial na coluna 1 e linha 3
      { column: 3, row: 4 }, // coordenadas do símbolo especial na coluna 3 e linha 4
    ],
  },
  roundTwo: {
    specialSymbols: [
      { column: 0, row: 2 }, // coordenadas do símbolo especial na coluna 0 e linha 2
      { column: 0, row: 3 }, // coordenadas do símbolo especial na coluna 0 e linha 3
    ],
  },
  roundThree: {
    specialSymbols: [
      { column: 4, row: 2 }, // coordenadas do símbolo especial na coluna 4 e linha 2
      { column: 4, row: 3 }, // coordenadas do símbolo especial na coluna 4 e linha 3
    ],
  },
};

/**
 * This must be used to get all game rounds cadences.
 */
const slotMachineCadences: RoundsCadences = {
  roundOne: [],
  roundTwo: [],
  roundThree: [],
};

/**
 * This function receives an array of coordinates relative to positions in the slot machine's matrix.
 * This array is the positions of the special symbols.
 * And it has to return a slot machine stop cadence.
 * @param symbols Array<SlotCoordinate> positions of the special symbols. Example: [{ column: 0, row: 2 }, { column: 2, row: 3 }]
 * @returns SlotCadence Array of numbers representing the slot machine stop cadence.
 */
function slotCadence(symbols: Array<SlotCoordinate>): SlotCadence {
  const cadence: SlotCadence = [];

  // percorre todas as colunas da máquina caça-níqueis
  for (let column = 0; column < anticipatorConfig.columnSize; column++) {
    let hasSpecialSymbol = false;

    // verifica se a coluna atual contém um símbolo especial
    for (const symbol of symbols) {
      if (symbol.column === column) {
        hasSpecialSymbol = true;
        break;
      }
    }

    // define a cadência da coluna atual
    const columnCadence = hasSpecialSymbol
      ? anticipatorConfig.anticipateCadence
      : anticipatorConfig.defaultCadence;
    cadence.push(columnCadence);
  }

  return cadence;
}

/**
 * Get all game rounds and return the final cadences of each.
 * @param rounds RoundsSymbols with contains all rounds special symbols positions.
 * @return RoundsCadences has all cadences for each game round.
 */
function handleCadences(rounds: RoundsSymbols): RoundsCadences {
  const cadences: RoundsCadences = {
    roundOne: [],
    roundTwo: [],
    roundThree: [],
  };

  // obtém as cadências de todas as rodadas do jogo
  cadences.roundOne = slotCadence(rounds.roundOne.specialSymbols);
  cadences.roundTwo = slotCadence(rounds.roundTwo.specialSymbols);
  cadences.roundThree = slotCadence(rounds.roundThree.specialSymbols);

  return cadences;
}

console.log(handleCadences(gameRounds));

console.log("CADENCES: ", handleCadences(gameRounds));

// Este código irá imprimir as cadências de todas as rodadas do jogo no console.
// Note que a implementação da função handleCadences cria um novo objeto cadences para armazenar as cadências
// de todas as rodadas do jogo, ao invés de utilizar o objeto slotMachineCadences fornecido no código original.
