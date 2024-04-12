import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, reset },
  ref
) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={reset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The Target Time was <strong>{targetTime} Seconds.</strong>
      </p>
      <p>
        You Stopped the Timer with{" "}
        <strong>{formattedRemainingTime} Seconds Left.</strong>
      </p>
      <form method="dialog" onSubmit={reset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
