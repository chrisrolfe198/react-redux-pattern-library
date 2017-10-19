import React, { PureComponent } from 'react';

const ListComponent = ({
  components
}) => {
  console.log(components);
  const first = components[0];
  return (
    <div>
      {components.map((item) => <SingleListItem item={item} />)}
    </div>
  );
}

const SingleListItem = ({
  item
}) => {
  return (
    <div className="single">
      {item()}
    </div>
  )
}

export default ListComponent;
