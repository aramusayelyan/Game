import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const levels = [
  {
    level: 1,
    locations: [
      { name: "Գանձասար Վանք", hint: "Միջնադարյան վանք, որը եղել է Արցախի հոգևոր կենտրոնը:", found: false },
      { name: "Տիգրանակերտ", hint: "Հին հայկական քաղաք, որը կառուցվել է Տիգրան Մեծի օրոք:", found: false }
    ]
  },
  {
    level: 2,
    locations: [
      { name: "Շուշիի բերդ", hint: "Պատմական ամրոց, որը եղել է ռազմավարական կարևոր կետ:", found: false },
      { name: "Ամարասի վանք", hint: "5-րդ դարի վանք, որտեղ հայոց այբուբենի առաջին դպրոցն է հիմնվել:", found: false }
    ]
  }
];

export default function ArtsakhAdventureGame() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameState, setGameState] = useState(levels[currentLevel].locations);
  const [score, setScore] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);

  const startExploration = (index) => {
    setCurrentLocation(gameState[index]);
  };

  const solvePuzzle = () => {
    if (currentLocation) {
      const newGameState = gameState.map(location =>
        location.name === currentLocation.name ? { ...location, found: true } : location
      );
      setGameState(newGameState);
      setScore(score + 1);
      setCurrentLocation(null);
    }
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setGameState(levels[currentLevel + 1].locations);
      setScore(0);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-indigo-600">Արցախի Խորհրդավոր Արկածը</h1>
      <p className="mb-4 text-lg">Փորձիր անցնել բոլոր փուլերը՝ բացահայտելով պատմական վայրերը:</p>
      <h2 className="text-2xl font-bold mb-2 text-red-500">Փուլ {currentLevel + 1}</h2>
      {!currentLocation ? (
        <div className="grid gap-4">
          {gameState.map((location, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className={`p-4 border rounded-lg ${location.found ? 'bg-green-200' : 'bg-white'}`}
            >
              <p className="text-lg font-bold">{location.name}</p>
              <p className="text-sm italic">{location.hint}</p>
              {!location.found && (
                <Button onClick={() => startExploration(index)} className="mt-2">Հետազոտել</Button>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <p className="text-xl font-bold text-blue-600">🔍 {currentLocation.name}</p>
          <p className="text-lg">{currentLocation.hint}</p>
          <Button onClick={solvePuzzle} className="mt-4">Լուծել հանելուկը</Button>
        </motion.div>
      )}
      {gameState.every(location => location.found) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          <p className="text-xl font-bold text-green-600">🎉 Դու ավարտեցիր փուլ {currentLevel + 1}! 🎉</p>
          {currentLevel < levels.length - 1 ? (
            <Button onClick={nextLevel} className="mt-4">Անցնել հաջորդ փուլ</Button>
          ) : (
            <p className="text-xl font-bold text-purple-600">🏆 Դու հաղթեցիր խաղը! 🏆</p>
          )}
        </motion.div>
      )}
    </div>
  );
}
