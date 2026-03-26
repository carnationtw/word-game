import React, { useState, useEffect, useRef } from 'react';

// --- 極限壓縮題庫資料池 ---
const rawDataPool = [
  "K|1|天今1明1空0白1雲白1烏1彩1黑1水河1雨1冰1喝1草青1綠1花1拔1鳥小1飛1候1青1",
  "K|1|聽好1偷1打1試1唱歌1合1伴1獨1輕重0放1年1減1歌唱1兒1情1詩1新年0舊0全1清1",
  "K|2|哥大1表1帥1老1牛水1公1黃1肉1車火1跑1公1汽1校學1全1母1本1鉛筆0字0粉0垂0",
  "K|2|寶珠0國1尋1珍1貝殼0寶1扇1干1安心0全0平1晚1固堅1牢1頑1凝1堅強0定0決0守0",
  "K|3|願望0心1志1意1限制0有1期1界1晨早1清1光1凌1苗樹1禾1幼1菜1徐風0步0和1清1",
  "K|3|披風0肩0掛0星1紗布0窗1婚1薄1順利0便0心0柔1垂下0直0柳0頭1股屁1市1份1一1",
  "K|4|潔清1純1整1白1環保0境0球0耳1境環1國1邊1仙1懶惰0人0覺0散0梳子0頭0理0妝0",
  "K|4|川河1冰1名1山1缺點0席0少0乏0窮人0苦0困0貧1繼續0承0父0母0研究0發0討0墨0",
  "K|5|簽名0字0約0到0遞傳1交1郵1快1傻子0瓜0氣0笑0瓜西1地1木1冬1符合0號0咒0音0",
  "K|5|匹馬0布0配0敵0怒憤1發1氣0火0廷朝1宮1內1外1妥協0當0善0貼0諫諍1勸1言0死1",
  "K|6|嶼島1海1小1群1獨立0自0特0裁0馳奔1飛1疾1電1幣硬1紙1金1值0莊村1農1山1別1",
  "K|6|址地1住1遺1網1屏風0幕0障0息0秘密0書0決0方0璀璨0目0然0星0璨璀1然0光1明1",
  "H|1|起來0床0飛0升0走路0開0行0出1你好0們0的0我1在現1存1外1內1左右0手0邊0轉0",
  "H|1|大小0人0家0門0風吹1大1微1颱1吹風0牛0氣0打0們我1你1他1人1來回0去0出0本1",
  "H|2|旅客0遊0行0館0行走0動0車0為0妙奇1美1巧1絕1公園0平0開0家0園公1花1校1樂1",
  "H|2|滴水0雨0眼0汗0躺下0平0臥0著0次一1名1數1多1落下0掉0降0失0荷花0葉0包0負0",
  "H|3|撐傘0持0開0住0首先0長0領0歌0符合0號0咒0音0膀翅1肩1臂1胱1鼻子0酸0音0孔0",
  "H|3|鐵器0路0打1鋼1碗飯1湯1洗1大1另外0一0類0行0彎腰0曲0度0月0鉤釣1掛1魚1鐵1",
  "H|4|慶國1祝1校1喜1懷疑0抱0念0關1祥吉1慈1和0不1儀式0表0容0地1序順1秩1次1程1",
  "H|4|驗考1測1實1經1拳打1頭0擊0太1谷山1峽1河1深1扮打1裝1演0假1勢氣1威1局1力1",
  "H|5|廳大1客1餐1舞1盞一1燈1酒1茶1灑水0脫0落0掃0壺水1茶1酒1夜1菊花0野1秋1雛1",
  "H|5|席座1出1缺1主1徐風0步0和1清1掌手1鼓1握0指0映倒1反1放1照1冠軍0王1皇1衣1",
  "H|6|矛盾0頭0槍1利1盾矛1牌0防1後1娛樂0歡1心0戲1帥將1哥0統0氣0跤摔1跌1滑1跤1",
  "H|6|獵打1人0犬0槍1尚高1未1和1時1括包1包1包1包1糞土0便0牛1鳥1寮工1豬1茅1客1",
  "N|1|太平0陽0空0多0充滿0電0分0實0電燈0話0視0池0雨水0天0滴0衣0過去0來0年0節0",
  "N|1|顏色0面0容0料0色彩0黑1白1紅1細小0長0心0線0著急0火0涼0迷0問題0答0候0好0",
  "N|2|情感1事1心1溫1候時1等1氣1問1翠綠0玉0青1鳥1溜冰0滑0走0開0滑冰0雪0倒0溜1",
  "N|2|敢勇1果1不1膽1超過0市0級0人1弟兄1小1表1堂1院庭1醫1法1學1正確0常0方0真1",
  "N|3|拔草0提1選1挺1牆城1圍1磚1壁1壁牆1崖1絕1石1往來0前0以0通0究研1追1竟1深1",
  "N|3|差別0錯0相1點1擋阻1遮1抵1退1祕密0方0書0神1藏躲1收1埋1冷1管理0水1不1血1",
  "N|4|苗樹1禾1幼1菜1雄英1偉1壯1性1昂高1貴0激1首0巡邏0視0迴0警0喚呼1叫1使1召1",
  "N|4|建築0立0設0造0築建1巢1修1路1致命0以1導1大1棟一1梁0兩1數1強大0堅1壯1勉1",
  "N|5|符號0合1咒0音0限制0有1期1界1北方0南0大0京0跡痕1奇1古1足1仰望0俯1頭0信1",
  "N|5|障故1礙0保0路0喧嘩0鬧0吵0賓0翅膀0鳥1雞1展0膀翅1肩1臂1胱1態狀1姿1度1動1",
  "N|6|逛街0遊0夜1亂1陌生0阡1路0街0醬油0果1菜1肉1貨百1物0商0送0築建1巢1修1路1",
  "N|6|港海1漁1商1出1罐水1頭0鐵1陶1衰老0退0弱0敗0盜強1海1偷1防1啞口0巴0沙1鈴1"
];

const generateFullDataset = () => {
  const data = { "康軒": {}, "翰林": {}, "南一": {} };
  const pubMap = { "K": "康軒", "H": "翰林", "N": "南一" };
  const grades = ['114下_一年級', '114下_二年級', '114下_三年級', '114下_四年級', '114下_五年級', '114下_六年級'];
  const lessons = ['第一課','第二課','第三課','第四課','第五課','第六課','第七課','第八課','第九課','第十課','第十一課','第十二課'];

  const pool = { "康軒": {}, "翰林": {}, "南一": {} };
  rawDataPool.forEach(str => {
    const pub = pubMap[str.substring(0, 1)];
    const gradeIdx = parseInt(str.substring(2, 3)) - 1;
    const gradeKey = grades[gradeIdx];
    if (!pool[pub][gradeKey]) pool[pub][gradeKey] = [];
    
    const content = str.substring(4);
    for (let i = 0; i < content.length; i += 9) {
      const chunk = content.substring(i, i + 9);
      if (chunk.length === 9) {
        const target = chunk[0];
        const clues = [chunk[1], chunk[3], chunk[5], chunk[7]];
        const answers = [
          chunk[2] === '0' ? target + chunk[1] : chunk[1] + target,
          chunk[4] === '0' ? target + chunk[3] : chunk[3] + target,
          chunk[6] === '0' ? target + chunk[5] : chunk[5] + target,
          chunk[8] === '0' ? target + chunk[7] : chunk[7] + target,
        ];
        pool[pub][gradeKey].push({ target, clues, answers });
      }
    }
  });

  Object.keys(data).forEach(pub => {
    grades.forEach(grade => {
      data[pub][grade] = {};
      const currentPool = pool[pub][grade] || pool[pub][grades[0]]; 
      lessons.forEach((lesson, index) => {
        const puzzles = [];
        for (let i = 0; i < 10; i++) {
          const pIdx = (index * 10 + i) % currentPool.length;
          puzzles.push(currentPool[pIdx]);
        }
        data[pub][grade][lesson] = puzzles;
      });
    });
  });

  return data;
};

const gameData = generateFullDataset();

// --- 音效產生器 ---
let audioCtx = null;
const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
};

const playCorrectSFX = () => {
  if (!audioCtx) return;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc1.type = 'sine';
  osc2.type = 'triangle';
  osc1.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
  osc1.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); 
  osc1.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.2); 
  osc2.frequency.setValueAtTime(523.25, audioCtx.currentTime); 
  osc2.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); 
  osc2.frequency.setValueAtTime(1046.50, audioCtx.currentTime + 0.2); 

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.2, audioCtx.currentTime + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
  
  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc1.start(audioCtx.currentTime);
  osc2.start(audioCtx.currentTime);
  osc1.stop(audioCtx.currentTime + 0.5);
  osc2.stop(audioCtx.currentTime + 0.5);
};

const playWrongSFX = () => {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.type = 'sawtooth';
  
  osc.frequency.setValueAtTime(150, audioCtx.currentTime); 
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.15); 
  osc.frequency.setValueAtTime(150, audioCtx.currentTime + 0.15); 
  osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.3); 

  gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.02);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
  gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 0.17);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
};

const App = () => {
  const [publisher, setPublisher] = useState("康軒");
  const [grade, setGrade] = useState("114下_一年級"); 
  const [selectedLessons, setSelectedLessons] = useState(["第一課"]);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [puzzles, setPuzzles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stats, setStats] = useState({ total: 0, correct: 0 });
  const [inputChar, setInputChar] = useState("");
  const [gameState, setGameState] = useState("playing"); 
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isRandomMode, setIsRandomMode] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const grades = Object.keys(gameData[publisher] || {});
    if (grades.length > 0 && !grades.includes(grade)) setGrade(grades[0]);
  }, [publisher, grade]);

  useEffect(() => {
    const lessons = Object.keys(gameData[publisher]?.[grade] || {});
    if (lessons.length > 0) {
      const validSelections = selectedLessons.filter(l => lessons.includes(l));
      if (validSelections.length === 0) setSelectedLessons([lessons[0]]);
      else setSelectedLessons(validSelections);
    }
  }, [publisher, grade]);

  const toggleLesson = (lessonName) => {
    if (selectedLessons.includes(lessonName)) {
      if (selectedLessons.length > 1) setSelectedLessons(selectedLessons.filter(l => l !== lessonName));
    } else {
      setSelectedLessons([...selectedLessons, lessonName]);
    }
  };

  const selectAllLessons = () => {
    setSelectedLessons(Object.keys(gameData[publisher]?.[grade] || {}));
  };

  const startGame = () => {
    initAudio(); 
    let combinedPuzzles = [];
    selectedLessons.forEach(l => {
      const lessonPuzzles = gameData[publisher]?.[grade]?.[l] || [];
      combinedPuzzles = [...combinedPuzzles, ...lessonPuzzles];
    });

    if (combinedPuzzles.length === 0) {
      alert("請至少選擇一課題庫！");
      return;
    }
    
    setPuzzles(combinedPuzzles.sort(() => 0.5 - Math.random()));
    setIsRandomMode(false);
    setCurrentIndex(0);
    setStats({ total: 0, correct: 0 });
    setGameState("playing");
    setInputChar("");
    setFeedback("");
    setShowHint(false);
    setIsPlaying(true);
  };

  const startRandomGame = () => {
    initAudio(); 
    let allPuzzles = [];
    Object.values(gameData).forEach(pubData => {
      Object.values(pubData).forEach(gradeData => {
        Object.values(gradeData).forEach(lessonPuzzles => {
          allPuzzles = [...allPuzzles, ...lessonPuzzles];
        });
      });
    });

    if (allPuzzles.length === 0) return alert("題庫載入失敗！");
    
    const shuffledPuzzles = allPuzzles.sort(() => 0.5 - Math.random()).slice(0, 10);
    setPuzzles(shuffledPuzzles);
    setIsRandomMode(true);
    setCurrentIndex(0);
    setStats({ total: 0, correct: 0 });
    setGameState("playing");
    setInputChar("");
    setFeedback("");
    setShowHint(false);
    setIsPlaying(true);
  };

  const handleEndGame = () => setIsPlaying(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputChar.trim() || gameState !== "playing") return;

    const currentPuzzle = puzzles[currentIndex];
    setStats(prev => ({ ...prev, total: prev.total + 1 }));

    if (inputChar.trim() === currentPuzzle.target) {
      playCorrectSFX();
      setGameState("correct");
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback(`⚡ COMBO！組合詞語為：${currentPuzzle.answers.join("、")}`);
    } else {
      playWrongSFX();
      setGameState("wrong");
      setFeedback("❌ ERROR！請再試試看！");
      setInputChar(""); 
      setTimeout(() => setGameState(current => current === 'wrong' ? 'playing' : current), 1000);
    }
  };

  const handleGiveUp = () => {
    if (gameState !== "playing") return;
    const currentPuzzle = puzzles[currentIndex];
    setStats(prev => ({ ...prev, total: prev.total + 1 }));
    setGameState("gaveUp");
    setFeedback(`答案是「${currentPuzzle.target}」。組合為：${currentPuzzle.answers.join("、")}`);
  };

  const handleNext = () => {
    if (currentIndex < puzzles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setGameState("playing");
      setInputChar("");
      setFeedback("");
      setShowHint(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setGameState("finished");
    }
  };

  const theme = { bg: '#0B0C10', panel: '#1F2833', neonCyan: '#45F3FF', neonPink: '#FF0055', neonYellow: '#FFE600', textMain: '#C5C6C7' };

  if (!isPlaying) {
    const availableLessons = Object.keys(gameData[publisher]?.[grade] || {});
    return (
      <div className="min-h-screen flex items-center justify-center p-4 font-sans text-white relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: theme.neonPink }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: theme.neonCyan }}></div>
        <div className="p-6 sm:p-8 rounded-[2rem] shadow-2xl w-full max-w-lg text-center relative z-10 border border-gray-800 backdrop-blur-sm" style={{ backgroundColor: 'rgba(31, 40, 51, 0.85)' }}>
          <h1 className="text-5xl sm:text-6xl font-black mb-2 tracking-widest italic" style={{ color: theme.neonCyan, textShadow: `0 0 10px ${theme.neonCyan}` }}>字字珠璣</h1>
          <p className="font-bold mb-8 text-lg sm:text-xl tracking-wider" style={{ color: theme.neonPink }}>▶ 程式設計：鄭念慈老師 ◀</p>
          <div className="space-y-4 mb-8 text-left font-medium">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-2 ml-1" style={{ color: theme.neonYellow }}>[ 選擇出版社 ]</label>
                <select className="w-full rounded-xl p-4 outline-none font-bold text-lg appearance-none cursor-pointer border-2 transition-all" style={{ backgroundColor: theme.bg, color: theme.neonCyan, borderColor: theme.panel }} value={publisher} onChange={(e) => setPublisher(e.target.value)}>
                  {Object.keys(gameData).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-2 ml-1" style={{ color: theme.neonYellow }}>[ 選擇學期 / 年級 ]</label>
                <select className="w-full rounded-xl p-4 outline-none font-bold text-lg appearance-none cursor-pointer border-2 transition-all" style={{ backgroundColor: theme.bg, color: theme.neonCyan, borderColor: theme.panel }} value={grade} onChange={(e) => setGrade(e.target.value)}>
                  {Object.keys(gameData[publisher] || {}).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-sm" style={{ color: theme.neonYellow }}>[ 自訂挑戰課別 (多選) ]</label>
                <button onClick={selectAllLessons} className="text-xs font-bold px-3 py-1 rounded hover:bg-gray-800 transition-colors" style={{ color: theme.neonCyan }}>全選 / ALL</button>
              </div>
              <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border-2 rounded-xl" style={{ borderColor: theme.panel, backgroundColor: theme.bg }}>
                {availableLessons.map(l => (
                  <button key={l} onClick={() => toggleLesson(l)} className={`px-3 py-2 rounded-lg text-sm font-bold border-2 transition-all ${selectedLessons.includes(l) ? 'scale-105' : 'opacity-50 hover:opacity-100'}`} style={{ borderColor: selectedLessons.includes(l) ? theme.neonPink : theme.panel, backgroundColor: selectedLessons.includes(l) ? 'rgba(255, 0, 85, 0.2)' : 'transparent', color: selectedLessons.includes(l) ? theme.neonPink : theme.textMain }}>
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-right text-xs mt-2 text-gray-500">已選取 {selectedLessons.length} 課 (共 {selectedLessons.reduce((acc, curr) => acc + (gameData[publisher][grade][curr]?.length || 0), 0)} 題)</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={startGame} className="w-full py-4 rounded-2xl text-xl font-black tracking-[0.1em] shadow-lg transition-all active:scale-95 hover:scale-[1.02] border-2" style={{ backgroundColor: theme.neonPink, color: '#fff', borderColor: '#ff4d88', boxShadow: `0 0 20px rgba(255, 0, 85, 0.4)` }}>
              開始自訂闖關
            </button>
            <button onClick={startRandomGame} className="w-full py-4 rounded-2xl text-xl font-black tracking-[0.1em] shadow-lg transition-all active:scale-95 hover:scale-[1.02] border-2" style={{ backgroundColor: theme.neonYellow, color: theme.bg, borderColor: '#cca300', boxShadow: `0 0 20px rgba(255, 230, 0, 0.3)` }}>
              🎲 隨機極限挑戰 (10題)
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentPuzzle = puzzles[currentIndex];
  const targetBoxStyle = (gameState === 'correct') 
    ? { backgroundColor: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', borderColor: '#4ade80', boxShadow: '0 0 30px rgba(74,222,128,0.6)' }
    : (gameState === 'wrong')
    ? { backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderColor: '#ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.6)' }
    : { backgroundColor: 'rgba(255, 0, 85, 0.1)', color: theme.neonPink };

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 font-sans text-white relative overflow-hidden" style={{ backgroundColor: theme.bg }}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes customShake { 0%, 100% { transform: translateX(0); } 20%, 60% { transform: translateX(-15px) rotate(-5deg); } 40%, 80% { transform: translateX(15px) rotate(5deg); } }
        @keyframes popIn { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } 40% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); } 100% { opacity: 0; transform: translate(-50%, -50%) scale(1.8); } }
        @keyframes floatUp { 0% { opacity: 1; transform: translate(-50%, -50%) scale(1); } 100% { opacity: 0; transform: translate(-50%, -200%) scale(1.5); } }
        .animate-custom-shake { animation: customShake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        .animate-pop-in { animation: popIn 0.6s ease-out forwards; }
        .animate-float-up { animation: floatUp 0.8s ease-out forwards; }
        .neon-box { box-shadow: 0 0 15px rgba(69, 243, 255, 0.4), inset 0 0 10px rgba(69, 243, 255, 0.2); border-color: #45F3FF; }
        .neon-box-target { box-shadow: 0 0 25px rgba(255, 0, 85, 0.6), inset 0 0 15px rgba(255, 0, 85, 0.3); border-color: #FF0055; transition: all 0.3s ease; }
      `}} />
      <div className={`absolute inset-0 pointer-events-none transition-opacity duration-300 z-50 ${gameState === 'wrong' ? 'bg-red-600/20 opacity-100' : 'opacity-0'}`}></div>
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-2xl max-h-2xl rounded-full blur-[120px] opacity-10 pointer-events-none transition-colors duration-500 ${gameState === 'correct' ? 'bg-green-500' : gameState === 'wrong' ? 'bg-red-500' : 'bg-cyan-500'}`}></div>

      <div className="w-full max-w-md flex justify-between items-center mb-8 px-4 z-10">
        <button onClick={handleEndGame} className="text-gray-400 hover:text-white text-sm font-bold border border-gray-700 px-4 py-2 rounded-lg bg-gray-900 transition-colors uppercase tracking-wider">« 結束任務</button>
        <div className="flex gap-4 text-sm font-bold bg-gray-900 border border-gray-700 px-5 py-2 rounded-lg tracking-widest">
          <div>關卡 <span style={{ color: theme.neonCyan }}>{currentIndex + 1}/{puzzles.length}</span></div>
          <div>得分 <span style={{ color: theme.neonPink }}>{stats.correct}</span></div>
        </div>
      </div>

      {gameState === "finished" ? (
        <div className="p-10 rounded-[2rem] text-center max-w-sm w-full border-2 backdrop-blur-md z-10" style={{ backgroundColor: 'rgba(31, 40, 51, 0.9)', borderColor: theme.neonYellow, boxShadow: `0 0 30px rgba(255, 230, 0, 0.3)` }}>
          <h2 className="text-4xl font-black mb-2 italic" style={{ color: theme.neonYellow }}>{isRandomMode ? '隨機挑戰完成' : '任務完成'}</h2>
          <p className="text-gray-400 font-bold mb-8 tracking-widest">挑戰結果</p>
          <div className="text-5xl font-black mb-8" style={{ color: theme.neonCyan, textShadow: `0 0 20px ${theme.neonCyan}` }}>
            {stats.correct} <span className="text-2xl text-gray-500">/ {puzzles.length}</span>
          </div>
          <button onClick={handleEndGame} className="w-full py-4 rounded-xl font-black text-xl tracking-[0.2em] hover:scale-105 transition-transform" style={{ backgroundColor: theme.neonCyan, color: theme.bg, boxShadow: `0 0 15px ${theme.neonCyan}` }}>回主選單</button>
        </div>
      ) : (
        <div className={`w-full max-w-sm flex flex-col items-center z-10 transition-transform ${gameState === 'wrong' ? 'animate-custom-shake' : ''}`}>
          <div className="flex flex-col items-center gap-3 mb-8 relative">
            <div className="flex gap-6 mb-1 z-10">
              <div className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl font-black border-2 neon-box bg-gray-900" style={{ color: theme.neonCyan }}>{currentPuzzle.clues[0]}</div>
              <div className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl font-black border-2 neon-box bg-gray-900" style={{ color: theme.neonCyan }}>{currentPuzzle.clues[1]}</div>
            </div>
            <div className="flex justify-center w-full z-20 relative">
              {gameState === 'correct' && (
                <>
                  <div className="absolute w-32 h-32 rounded-full border-4 border-green-400 animate-ping opacity-50"></div>
                  <div className="absolute top-1/2 left-1/2 text-green-400 font-black text-9xl animate-pop-in drop-shadow-[0_0_20px_rgba(74,222,128,1)] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2">〇</div>
                  <div className="absolute top-0 left-1/2 text-yellow-400 font-black text-5xl animate-float-up drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] pointer-events-none z-50 -translate-x-1/2">+1</div>
                </>
              )}
              {gameState === 'wrong' && <div className="absolute top-1/2 left-1/2 text-red-500 font-black text-9xl animate-pop-in drop-shadow-[0_0_20px_rgba(239,68,68,1)] pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2">Ｘ</div>}
              <div className={`w-28 h-28 rounded-2xl flex items-center justify-center text-6xl font-black border-4 neon-box-target transition-all duration-300 ${gameState === 'correct' ? 'scale-110' : gameState === 'wrong' ? 'scale-90' : ''}`} style={targetBoxStyle}>
                {(gameState === 'correct' || gameState === 'gaveUp') ? currentPuzzle.target : '?'}
              </div>
            </div>
            <div className="flex gap-6 mt-1 z-10">
              <div className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl font-black border-2 neon-box bg-gray-900" style={{ color: theme.neonCyan }}>{currentPuzzle.clues[2]}</div>
              <div className="w-24 h-24 rounded-xl flex items-center justify-center text-5xl font-black border-2 neon-box bg-gray-900" style={{ color: theme.neonCyan }}>{currentPuzzle.clues[3]}</div>
            </div>
          </div>

          <div className="h-10 mb-2 flex items-center justify-center w-full">
            {feedback ? (
              <p className={`font-black text-lg tracking-wider ${gameState === 'correct' ? 'text-green-400' : gameState === 'wrong' ? 'text-red-500' : 'text-yellow-400'}`} style={{ textShadow: '0 0 10px currentColor' }}>{feedback}</p>
            ) : <p className="text-gray-600 font-bold tracking-widest text-sm">等待輸入...</p>}
          </div>

          <div className="h-12 mb-6 flex items-center justify-center w-full">
            {(gameState === 'playing' || gameState === 'wrong') && (
              showHint ? (
                <div className="text-yellow-400 font-bold text-sm bg-yellow-900/30 px-6 py-3 rounded-xl border border-yellow-500/50">
                  <span className="opacity-70">系統提示：</span> 與「{currentPuzzle.clues[0]}」可組成「{currentPuzzle.answers[0].replaceAll(currentPuzzle.target, '〇')}」
                </div>
              ) : <button type="button" onClick={() => setShowHint(true)} className="text-gray-400 border border-gray-600 px-6 py-2 rounded-xl font-bold text-sm hover:border-yellow-400 hover:text-yellow-400 transition-colors">獲取提示 [?]</button>
            )}
          </div>

          {(gameState === 'playing' || gameState === 'wrong') ? (
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <div className="flex w-full rounded-xl overflow-hidden shadow-sm border-2 transition-colors focus-within:border-[#45F3FF]" style={{ borderColor: theme.panel, backgroundColor: theme.bg }}>
                <input ref={inputRef} type="text" maxLength={1} placeholder="請輸入..." className="flex-grow min-w-0 w-full p-4 text-2xl font-black outline-none text-center bg-transparent placeholder-gray-700 disabled:opacity-50 disabled:cursor-not-allowed" style={{ color: theme.neonCyan }} value={inputChar} onChange={(e) => setInputChar(e.target.value.trim())} autoComplete="off" spellCheck="false" autoCorrect="off" autoFocus disabled={gameState !== 'playing'} />
                <button type="submit" className="shrink-0 whitespace-nowrap px-5 sm:px-6 text-lg sm:text-xl font-black tracking-widest hover:brightness-125 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1" style={{ backgroundColor: theme.panel, color: theme.neonCyan }} disabled={!inputChar.trim() || gameState !== 'playing'}>
                  送出 <span className="text-sm opacity-50 hidden sm:inline">↵</span>
                </button>
              </div>
              <button type="button" onClick={handleGiveUp} disabled={gameState !== 'playing'} className="w-full py-3 rounded-xl text-gray-400 text-sm font-bold tracking-widest border border-gray-800 hover:bg-red-900/20 hover:text-red-400 hover:border-red-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed">[ 放棄看答案 ]</button>
            </form>
          ) : (
            <div className="w-full flex flex-col gap-4 mt-2">
               <button onClick={handleNext} className="w-full py-5 rounded-xl font-black text-xl tracking-[0.2em] transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: theme.neonYellow, color: theme.bg, boxShadow: `0 0 15px ${theme.neonYellow}` }}>
                {currentIndex < puzzles.length - 1 ? "下一關" : "查看結果"}
              </button>
            </div>
          )}
        </div>
      )}
      <div className="mt-auto pt-6 pb-2 text-xs font-bold opacity-40 tracking-widest">程式設計：鄭念慈老師</div>
    </div>
  );
};

export default App;