import {css} from 'lit';

export const styles = css`
    :host {
        --color1: #3fd2c7;
        --color2: #00458b;
        --color3: rgba(153, 221, 255, 0.3);
        --white: #ffffff;
    }
    
    div {
        padding: 5px;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    input {
        box-sizing: border-box;
        padding-left: 5px;
        padding-right: 5px;
    }

    textarea {
        font-family: Arial, Helvetica, sans-serif;
        padding-left: 5px;
        padding-right: 5px;
        width: 100%; 
        height: 50px; 
        resize: none
    }

    .loader {
        border: 8px solid var(--white);
        border-radius: 50%;
        border-top: 8px solid var(--color2);
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
    }


    @keyframes spin {
        0% { 
            transform: rotate(0deg); 
        }
        100% { 
            transform: rotate(360deg); 
        }
    }

    .flex {
        display: flex;
    }

    .flex-col {
        flex-direction: column;
    }

    .flex-row {
        flex-direction: row;
    }

    .flex-justify-center {
        justify-content: center;
    }

    .flex-align-center {
        align-items: center;
    }

    .round-border {
        border-radius: 15px;
    }

    .custom-btn {
        font-weight: bold;
        letter-spacing: 0.05em;
        cursor: pointer;
        border: 1px solid transparent;
        border-radius: 15px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        transition-duration: 0.2s;
        color: var(--white);
    }

    .custom-btn-err {
        animation: shake 0.2s linear 4;
    }

    .btn-color1 {
        background-color: var(--color1);
    }

    .btn-color1:hover {
        color: var(--color1);
        border-color: var(--color1);
        background-color: var(--white);
    }

    .btn-color2 {
        background-color: var(--color2);
    }

    .btn-color2:hover {
        color: var(--color2);
        border-color: var(--color2);
        background-color: var(--white);
    }

    @keyframes shake {
        0% {
            transform: translateX(0px);
        }
        25% {
            transform: translateX(-4px);
        }
        50% {
            transform: translateX(0px);
        }
        75% {
            transform: translateX(4px);
        }
        100% {
            transform: translateX(0px);
        }
    }
`;