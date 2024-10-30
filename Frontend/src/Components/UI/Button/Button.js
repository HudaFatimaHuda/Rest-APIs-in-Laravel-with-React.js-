import './Button.css'; 

const Button = (props) => {
    return(
        <div className="d-inline-flex justify-content-center justify-content-lg-start">
            <button type={props.type} className="btn button" onClick={props.onClick} disabled={props.disabled}>{props.text}</button>
        </div>
    )
}

export default Button; 