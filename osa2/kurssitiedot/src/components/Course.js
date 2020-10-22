import React from 'react'

const Header = (props) => {
    return (
      <div>
        <h2>
          {props.course.name}
        </h2>
      </div>
    )
}
  
const Part = (props) => {
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
}
  
const Content = (props) => {
    return (
      <div>
        {props.course.parts.map( i => <Part key={i.id} part={i} /> )}
      </div>
    )
}
  
const Total = (props) => {
    return (
      <div>
        <b>
          Total number of exercises {props.course.parts.map(part => part.exercises).reduce((s, p) => s + p)}
        </b>
      </div>
    )
}
  
const Course = (props) => {
    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </div>
    )
}

export default Course