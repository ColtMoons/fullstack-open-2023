import './message.css'

const Message = ({message, error}) => {
  return (
    <div className={error ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Message;