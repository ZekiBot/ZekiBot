import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePoints } from '@/context/PointsContext';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/context/AuthContext';

interface GameWord {
  word: string;
  hint: string;
  letters: string[];
  guessedLetters: boolean[];
}

const ALPHABET = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ".split('');
const GROUP_SIZE = 7; // Number of letters per row

const GameInterface: React.FC = () => {
  const [game, setGame] = useState<GameWord | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { spendPoints, addPoints } = usePoints();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  // Group the alphabet for display
  const alphabetGroups = [];
  for (let i = 0; i < ALPHABET.length; i += GROUP_SIZE) {
    alphabetGroups.push(ALPHABET.slice(i, i + GROUP_SIZE));
  }

  const startNewGame = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Giriş Yapın",
        description: "Bu özelliği kullanabilmek için giriş yapmalısınız.",
        variant: "destructive"
      });
      return;
    }

    // Cost to play a game
    const pointCost = 2;
    
    // Check if user has enough points
    const success = await spendPoints(pointCost, "Game play");
    if (!success) {
      toast({
        title: "Yetersiz Puan",
        description: "Oyun oynamak için yeterli puanınız yok.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setGameOver(false);
    setTimeLeft(60);
    setScore(0);

    try {
      // Get a new word from the backend
      const response = await apiRequest('GET', '/api/ai/game/word');
      const data = await response.json();
      
      setGame({
        word: data.word,
        hint: data.hint,
        letters: data.word.split(''),
        guessedLetters: Array(data.word.length).fill(false)
      });
    } catch (error) {
      console.error('Error starting game:', error);
      toast({
        title: "Hata",
        description: "Oyun başlatılırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize game
  useEffect(() => {
    if (isAuthenticated) {
      startNewGame();
    }
  }, [isAuthenticated]);

  // Timer
  useEffect(() => {
    if (!game || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [game, gameOver]);

  const handleLetterGuess = (letter: string) => {
    if (!game || gameOver) return;

    const newGuessedLetters = [...game.guessedLetters];
    let correctGuess = false;

    game.letters.forEach((gameLetter, index) => {
      if (gameLetter.toUpperCase() === letter && !newGuessedLetters[index]) {
        newGuessedLetters[index] = true;
        correctGuess = true;
      }
    });

    if (correctGuess) {
      // Add points for correct guess
      setScore((prevScore) => prevScore + 10);
    } else {
      // Penalty for wrong guess
      setTimeLeft((prevTime) => Math.max(0, prevTime - 5));
    }

    setGame({
      ...game,
      guessedLetters: newGuessedLetters
    });

    // Check if all letters are guessed
    const allGuessed = newGuessedLetters.every(guessed => guessed);
    if (allGuessed) {
      handleGameWin();
    }
  };

  const handleGameWin = async () => {
    setGameOver(true);
    
    // Calculate final score based on time left
    const finalScore = score + timeLeft;
    setScore(finalScore);
    
    // Add points as reward
    const pointsToAdd = Math.floor(finalScore / 10);
    await addPoints(pointsToAdd, "Game reward");
    
    toast({
      title: "Tebrikler!",
      description: `Kelimeyi doğru tahmin ettiniz! ${pointsToAdd} puan kazandınız.`,
    });
    
    // Send score to backend
    try {
      await apiRequest('POST', '/api/ai/game/score', { 
        score: finalScore,
        gameType: 'wordGuess'
      });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const handleGuessWord = () => {
    if (!game) return;
    
    // Reveal all letters and end game
    setGame({
      ...game,
      guessedLetters: Array(game.letters.length).fill(true)
    });
    
    handleGameWin();
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border shadow-lg">
        <div className="border-b border-dark-border p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Kelime Oyunu</h3>
          <button className="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Giriş Yapın</h3>
          <p className="text-gray-400 mb-4">Oyun oynamak için giriş yapmanız gerekmektedir.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-surface rounded-xl overflow-hidden border border-dark-border shadow-lg">
      <div className="border-b border-dark-border p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Kelime Oyunu</h3>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-secondary-light mb-4"></div>
            <p className="text-gray-400">Oyun yükleniyor, lütfen bekleyin...</p>
          </div>
        ) : game ? (
          <div className="mb-6 text-center">
            <p className="text-gray-400 mb-2">Yapay zeka tarafından oluşturulan ipucunu takip ederek kelimeyi tahmin edin.</p>
            <div className="bg-dark-bg p-4 rounded-lg mb-4">
              <p className="text-white">İpucu: <span className="font-medium">{game.hint}</span></p>
            </div>
            
            <div className="flex justify-center gap-2 mb-6">
              {game.letters.map((letter, index) => (
                <div 
                  key={index} 
                  className={`w-10 h-10 border-2 ${game.guessedLetters[index] ? 'border-green-500' : 'border-gray-500'} rounded flex items-center justify-center text-white font-bold text-xl`}
                >
                  {game.guessedLetters[index] ? letter.toUpperCase() : ''}
                </div>
              ))}
            </div>
            
            <div className="flex justify-center gap-2 mb-4">
              <div className="bg-secondary-dark text-white text-xs px-3 py-1 rounded-full">Skor: {score}</div>
              <div className={`${timeLeft < 10 ? 'bg-red-700' : 'bg-gray-700'} text-white text-xs px-3 py-1 rounded-full transition-colors`}>
                Kalan Zaman: {timeLeft}s
              </div>
            </div>
            
            {gameOver && (
              <div className="bg-dark-bg rounded-lg p-4 mb-4 border border-primary">
                <h4 className="font-bold text-lg mb-2">Oyun Bitti!</h4>
                <p className="text-gray-300 mb-2">Final Skorunuz: {score}</p>
                <Button 
                  onClick={startNewGame}
                  className="bg-primary hover:bg-primary-dark text-white transition"
                >
                  Yeni Oyun Başlat (2 Puan)
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Oyun hazır değil.</p>
            <Button 
              onClick={startNewGame}
              className="bg-secondary hover:bg-secondary-dark text-white transition"
            >
              Oyun Başlat (2 Puan)
            </Button>
          </div>
        )}
        
        {game && !gameOver && (
          <div className="bg-dark-bg rounded-lg p-4">
            {alphabetGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="grid grid-cols-7 gap-2 mb-2">
                {group.map((letter) => (
                  <Button
                    key={letter}
                    className="bg-dark-surface hover:bg-dark-surface/80 text-white font-medium rounded h-10 w-10 flex items-center justify-center transition p-0"
                    onClick={() => handleLetterGuess(letter)}
                    disabled={gameOver}
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            ))}
            
            <div className="flex justify-center mt-4">
              <Button
                className="px-4 py-2 bg-secondary hover:bg-secondary-dark text-white rounded-lg transition font-medium flex items-center gap-2"
                onClick={handleGuessWord}
                disabled={gameOver}
              >
                <span>Tahmin Et</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameInterface;
