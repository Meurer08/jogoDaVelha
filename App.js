import { Text, SafeAreaView, StyleSheet } from 'react-native';
// You can import supported modules from npm
import { Card } from 'react-native-paper';
import React, {useState} from 'react'

// or any files within the Snack
import AssetExample from './components/AssetExample';

const Square = ({value, handleClick}) => {
  return (
    <button style={styles.square} onClick={handleClick}>{value}</button>
  )
};

const Tabuleiro = ({xIsNext, quadrados, onPlay}) =>{
  
  const moviemntoAtual = (index) => {
      if(calculaVencedor(quadrados) || quadrados[index]){
        return;
      }
      const nextSquare = quadrados.slice();
      if(xIsNext){
        nextSquare[i] = x;
      } else {
        nextSquare[i] = 'o';
    }
    onPlay(nextSquare)
  }

  const vencedor = calculaVencedor(quadrados);
  let status = vencedor ? 'Vencedor: '+ vencedor : 'Próximo: ' + (xIsNext ? 'X':'O');
  
  return (
    <SafeAreaView style={styles.container}>
    <div style={styles.tab}>
      <Square value={quadrados[0]} onSquareClick={()=>moviemntoAtual(0)} />
      <Square value={quadrados[1]} onSquareClick={()=>moviemntoAtual(1)} />
      <Square value={quadrados[2]} onSquareClick={()=>moviemntoAtual(2)} />
    
      <Square value={quadrados[3]} onSquareClick={()=>moviemntoAtual(3)} />
      <Square value={quadrados[4]} onSquareClick={()=>moviemntoAtual(4)} />
      <Square value={quadrados[5]} onSquareClick={()=>moviemntoAtual(5)} />

      <Square value={quadrados[6]} onSquareClick={()=>moviemntoAtual(6)} />
      <Square value={quadrados[7]} onSquareClick={()=>moviemntoAtual(7)} />
      <Square value={quadrados[8]} onSquareClick={()=>moviemntoAtual(8)} />
    </div>
    </SafeAreaView>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return(
    <Tabuleiro xIsNext={xIsNext} quadrados={currentSquares} onPlay={handlePlay}/>
  )
}

function calculaVencedor(quadrados) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < linhas.length; i++) {
    const [a, b, c] = linhas[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c]) {
      return quadrados[a];
    }
  }
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  square: {
    width: 20,
    height: 20,
    borderRadius: 0,
  },
  tab: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
  }
});
