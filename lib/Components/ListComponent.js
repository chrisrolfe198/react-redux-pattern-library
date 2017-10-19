import React, { PureComponent } from 'react';

const breaker = 5;
let start = 0;

const ListComponent = ({
  components
}) => {
  console.log(components);
  const first = components[0];
  return (
    <div>
      {components.map((item, index) => {
        if (typeof item === 'function') {
          return <SingleListItem key={index} item={item} />
        } else {
          return (
            <div>
              <h1>{index}</h1>
              <SectionContainer item={item} />
            </div>
          );
        }
      })}
    </div>
  );
}

const SingleListItem = ({
  item
}) => {
  if (typeof item === 'function') {
    return (
      <div className="single">
        {item()}
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const SectionContainer = ({
  item
}) => {
  start++;

  if (start > breaker) {
    console.log(typeof item);
    return <h4>Error too much looping</h4>
  }

  if (typeof item === 'function') {
    return <SingleListItem item={item} />
  } else {
    return Object.keys(item).map(inner => <SectionContainer item={item[inner]} />);
  }
}

export default ListComponent;
