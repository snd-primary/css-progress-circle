## 概要

React環境における、
CSS @property と Web Animation API を組み合わせた、プログレスサークルの実装例です。

## App.tsxの実装内容(AIによる説明)

- **状態管理 (`useState`)**:
  - `duration`: アニメーションの総実行時間 (ミリ秒) を管理します。
  - `running`: アニメーションが現在再生中 (`true`) か、停止/一時停止中 (`false`) かを管理します。
- **参照 (`useRef`)**:
  - `circleRef`: プログレスサークルを描画する `div` 要素への参照を保持します。
  - `animationRef`: Web Animation API によって生成された `Animation` オブジェクトへの参照を保持します。これにより、`play()`, `pause()`, `cancel()` といったメソッドを直接呼び出すことができます。
- **副作用 (`useEffect`)**:
  - **アニメーション生成**: コンポーネントのマウント時、および `duration` が変更された際に `useEffect` が実行されます。`circleRef.current.animate()` を使用して、CSS カスタムプロパティ (`--angle`) を 0% から 100% までアニメーションさせます。生成された `Animation` オブジェクトは `animationRef` に格納されます。`duration` が変更されるたびに古いアニメーションはキャンセルされ、新しい設定で再生成されます。
  - **再生/一時停止制御**: `running` state の変更を監視する別の `useEffect` です。`running` の値に応じて `animationRef.current` の `play()` または `pause()` メソッドを呼び出し、アニメーションの再生状態を制御します。
  - **クリーンアップ**: 各 `useEffect` 内のクリーンアップ関数 (`return () => { ... };`) で、コンポーネントのアンマウント時や依存関係の変更前に `animationRef.current.cancel()` を呼び出し、不要になったアニメーションを確実に停止・破棄します。
- **CSS 連携**:
  - React コンポーネントは `element.animate()` を通じて CSS カスタムプロパティ (`--angle`) の値を動的に変更します。
  - 実際のプログレスサークルの描画は CSS 側で行います。`@property` で `--angle` を `<percentage>` として定義し、`conic-gradient(..., var(--angle))` のように使用することを想定しています。
