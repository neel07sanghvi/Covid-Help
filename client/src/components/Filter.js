import React from 'react';

export default function Filter() {
    return (
        <> 
            <form>
                <div className="form-row align-items-center d-flex col-9 justify-content-center" style={{columnGap: "0.5rem", marginLeft: "16%",}}>
                    <div className="col-xs-4 mt-2">
                        <input type="text" className="form-control mt-2" placeholder="Country"></input>
                    </div>
                    <div className="col-xs-4 mt-2">
                        <input type="text" className="form-control mt-2" placeholder="State"></input>
                    </div>
                    <div className="col-xs-4 mt-2">
                        <input type="text" className="form-control mt-2" placeholder="City"></input>
                    </div>
                    <div className="col-xs-4 mt-2">
                        <button className="btn btn-primary mt-2" type="submit">Apply</button>
                    </div>
                </div>
            </form>
        </>
    );
}