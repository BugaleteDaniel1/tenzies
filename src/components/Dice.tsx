export default function Dice(props: any) {
  let dices = props.numbers.map((obj: any, index: any) => {
    let background;
    if (obj.selected === true) {
      background = "#59e391";
    } else background = "";

    return (
      <div
        style={{ background: background }}
        onClick={(e) => props.handleClick(e)}
        className="dice"
        key={obj.id.toString()}
        data-target={index}
      >
        {obj.number}
      </div>
    );
  });
  return <main className="dice__container">{dices}</main>;
}
