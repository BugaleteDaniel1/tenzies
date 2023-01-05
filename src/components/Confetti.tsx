import ReactConfetti from "react-confetti";

const Confetti = () => {
  const { innerWidth, innerHeight } = window;

  return (
    <>
      <ReactConfetti width={innerWidth} height={innerHeight} />
    </>
  );
};
export default Confetti;
