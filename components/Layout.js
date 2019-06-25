import Head from 'next/head';

function Layout(props) {
    return (
        <div className="body">
            <Head>
                <title>Tri's Weather App</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link href="/static/css/bootstrap.min.css" rel="stylesheet" />
            </Head>
            <div>
                {props.children}
            </div>
            <p>
                Copyright © 2019 <a target="_blank" href="https://trirawibowo.my.id">Tri Rumekso Anggie Wibowo</a>
            </p>
            <p>
                Powered by <a target="_blank" href="https://darksky.net">Dark Sky</a> and <a target="_blank" href="https://mapquest.com/">MapQuest.</a>
            </p>
            <style jsx global>{`
                body {
                    background-color: turquoise;
                }
            `}</style>
            <style jsx>{`
                .body {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-top: 20px;
                    padding-bottom: 5px;
                }

                p {
                    font-size: small;
                    text-align: center;
                    margin-top: 10px;
                }
            `}</style>
        </div>
    );
}

export default Layout;
