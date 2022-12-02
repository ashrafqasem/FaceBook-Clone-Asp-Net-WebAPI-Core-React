import React from 'react';
import { Duck } from './demo';

interface Props {
    duck: Duck;
}

// export default function DuckItem(props: Props) {
//     return (
//         <div key={props.duck.name}>
//         <span>{props.duck.name}</span>
//         <button onClick={() => props.duck.makeSound!(props.duck.name + ' quack')}>button1</button>
//       </div>
//     )
// }

export default function DuckItem({duck}: Props) {
    return (
      // <div key={duck.name}> //Warning: Each child in a list should have a unique "key" prop.
      <div>
        <span>{duck.name}</span>
        <button onClick={() => duck.makeSound!(duck.name + ' quack')}>button1</button>
      </div>
    )
}