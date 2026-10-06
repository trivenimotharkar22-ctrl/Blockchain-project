// ==========================================
// Student Blockchain Registration
// Local Hardhat Blockchain
// ==========================================

// Your deployed contract address
const contractAddress =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Local Hardhat RPC
const RPC_URL = "http://127.0.0.1:8545";

// Hardhat Account #0 - LOCAL DEVELOPMENT ONLY
// const privateKey =
//     "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const privateKey = "LOCAL_HARDHAT_PRIVATE_KEY";

// Smart contract ABI
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_rollNumber",
                "type": "uint256"
            }
        ],
        "name": "registerStudent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rollNumber",
                "type": "uint256"
            }
        ],
        "name": "getStudent",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Connect directly to local Hardhat
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Local Hardhat account for signing transactions
const wallet = new ethers.Wallet(privateKey, provider);

// Contract for writing
const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    wallet
);


// ==========================================
// Register Student
// ==========================================

async function registerStudent() {

    const name =
        document.getElementById("studentName").value.trim();

    const rollNumber =
        document.getElementById("rollNumber").value.trim();

    const status =
        document.getElementById("registerStatus");

    if (name === "" || rollNumber === "") {
        status.innerText = "Please enter all details.";
        return;
    }

    try {

        status.innerText =
            "Connecting to local blockchain...";

        // Check blockchain connection
        await provider.getBlockNumber();

        status.innerText =
            "Registering student on blockchain...";

        const transaction =
            await contract.registerStudent(
                name,
                rollNumber
            );

        status.innerText =
            "Transaction submitted. Waiting for confirmation...";

        await transaction.wait();

        status.innerText =
            "✓ Student registered successfully on blockchain!";

        // Clear registration fields
        document.getElementById("studentName").value = "";
        document.getElementById("rollNumber").value = "";

    } catch (error) {

        console.error(error);

        status.innerText =
            "Transaction failed. Make sure Hardhat node is running.";
    }
}


// ==========================================
// Search Student
// ==========================================

async function searchStudent() {

    const rollNumber =
        document.getElementById("searchRollNumber").value.trim();

    const result =
        document.getElementById("studentResult");

    if (rollNumber === "") {

        result.innerHTML =
            "<p>Please enter a roll number.</p>";

        return;
    }

    try {

        result.innerHTML =
            "<p>Searching blockchain...</p>";

        // Read directly from local blockchain
        const student =
            await contract.getStudent(rollNumber);

        if (student[0] === "") {

            result.innerHTML =
                "<p><strong>Student not found.</strong></p>";

        } else {

            result.innerHTML = `
                <p>
                    <strong>Student Name:</strong>
                    ${student[0]}
                </p>

                <p>
                    <strong>Roll Number:</strong>
                    ${student[1].toString()}
                </p>

                <p style="color: green;">
                    ✓ Student verified from blockchain
                </p>
            `;
        }

    } catch (error) {

        console.error(error);

        result.innerHTML =
            "<p>Unable to connect to blockchain.</p>";
    }
}