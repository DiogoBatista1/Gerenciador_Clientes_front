import React from "react";

function BottomBar() {
    return (
        <div style={styles.bottombar}>
            <p style={styles.bottombar}>© 2024 3Dr Designer. Desenvolvido por Diogo.</p>
        </div >
    );
}

const styles = {
    bottombar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#343a40',
        color: 'white',
        textAlign: 'center',
        padding: '10px 0',
        marginTop: '20px',
    },
    text: {
        margin: 0
    },
};

export default BottomBar;