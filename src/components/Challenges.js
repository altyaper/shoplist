import Challenge from "./Challenge";

const Challenges = props => {
  const { challenges } = props;
  return (
    <ul className="list">
      { challenges && challenges.map((challenge, idx) => (
        <Challenge key={idx} {...props} challenge={challenge} />
      ))}     
    </ul>
  )
}

export default Challenges;