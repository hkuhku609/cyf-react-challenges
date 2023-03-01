import React from 'react';
type Scores = {
  items: { n: string; s: number }[];
};
const Items = ({ items }: Scores): JSX.Element => {
  return (
    <>
      {items.map((item, i) => (
        <div key={i} className='flex'>
          <div className='text-right'>{item.n}</div>
          <div className='text-right' data-testid='score'>
            {item.s}
          </div>
        </div>
      ))}
    </>
  );
};
export default Items;
