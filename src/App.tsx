import { useEffect, useRef, useState } from "react";
import "./App.css"; // CSSファイルのインポート (ここに @property --angle や conic-gradient の定義がある)

const App: React.FC = () => {
	const circleRef = useRef<HTMLDivElement | null>(null);
	const animationRef = useRef<Animation | null>(null);
	const [duration, setDuration] = useState<number>(10000);
	const [running, setRunning] = useState<boolean>(false);

	const handlePlay = () => {
		if (animationRef.current) {
			animationRef.current.play();
		}
	};

	const handlePause = () => {
		if (animationRef.current) {
			animationRef.current.pause();
		}
	};

	const handleReset = () => {
		if (animationRef.current) {
			animationRef.current.cancel();
			setRunning(false);
		}
	};

	useEffect(() => {
		if (circleRef.current) {
			const circle = circleRef.current;

			// Web Animation API を使用してアニメーションを作成
			const animation = circle.animate(
				// キーフレーム: CSSカスタムプロパティ '--angle' を 100% から 0% に変化させる
				[{ "--angle": "100%" }, { "--angle": "0%" }],

				// オプション: 実行時間、イージング関数、アニメーション終了後の状態
				{
					duration: duration,
					easing: "linear",
					fill: "forwards",
				}
			);

			animationRef.current = animation;
			animationRef.current.pause();
		}

		return () => {
			if (animationRef.current) {
				animationRef.current.cancel();
			}
		};
	}, [duration]);

	useEffect(() => {
		if (running) {
			handlePlay();
		} else {
			handlePause();
		}
	}, [running]);

	return (
		<>
			<h1>CSS PROGRESS CIRCLE EXAMPLE</h1>
			<p className="read-the-docs">
				@propertyとWeb Animation APIを組み合わせて実装した
				<br />
				プログレスサークルのサンプルです
			</p>
			<div className="container">
				<div ref={circleRef} className="progressCircle" />
				<div className="controlButtons">
					<button onClick={() => setRunning(true)}>play</button>
					<button onClick={() => setRunning(false)}>pause</button>
					<button onClick={handleReset}>reset</button>
				</div>
				<label className="timeInput">
					<span>実行時間(ms)</span>
					<input
						type="number"
						value={duration}
						onChange={(e) => setDuration(Number(e.target.value))}
						min={0}
						placeholder="10000(ms)"
					/>
				</label>
			</div>
		</>
	);
};

export default App;
