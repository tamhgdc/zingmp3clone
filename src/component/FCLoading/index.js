import React from 'react';

const Loading = ({ height = 'calc(100vh - 208px)' }) => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: height,
            }}
        >
            <div className="loadingio-spinner-spin">
                <div className="ldio-jtlecs8wkj">
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
