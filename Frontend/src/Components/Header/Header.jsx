const Header = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <div className="container-fluid">
                <a className="navbar-brand" href="abc">CRUD</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Nav items */}
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </div>
        </nav>

  )
}

export default Header; 