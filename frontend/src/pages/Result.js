const Result = ({ colors, total }) => {
  colors = Object.entries(colors);
  return (
    <>
      {colors.map((colorData) => {
        return (
          <div
            key={colorData[0]}
            style={{
              backgroundColor: colorData[1][1],
            }}
          >
            {(colorData[1][0] / total) * 100}%
          </div>
        );
      })}
    </>
  );
};

export default Result;
