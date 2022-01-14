const frameStyle = {
    width: '100%',
    height: '800px',
    frameborder: '0'
};

export default function Html6Tests() {

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="text-center m-0  d-flex flex-column justify-content-center">
                            <iframe id="demoframe" name="alldemoframe" src="http://html6test.com/" style={frameStyle} allowFullScreen />
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
}