function solve() {
  const info = document.getElementById("info").firstChild;
  const url = "http://localhost:3030/jsonstore/bus/schedule/";

  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");

  let nextStop = "depot";
  let arriving = "";

  async function depart() {
    info.textContent = "Loading ...";

    try {
      const response = await fetch(`${url}/${nextStop}`);

      if (response.status !== 200) {
        throw new Error();
      }

      const data = await response.json();
      info.textContent = `Next stop ${data.name}`;
      arriving = data.name;
      nextStop = data.next;
      departBtn.disabled = true;
      arriveBtn.disabled = false;
    } catch (err) {
      info.textContent = `${err}`;
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  function arrive() {
    info.textContent = `Arriving at ${arriving}`;
    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();

// function solve() {
//   const info = document.getElementById("info").firstChild;
//   const url = "http://localhost:3030/jsonstore/bus/schedule/";

//   const departBtn = document.getElementById("depart");
//   const arriveBtn = document.getElementById("arrive");

//   let nextStop = "depot";
//   let arriving = "";

//   function depart() {
//     info.textContent = 'Loading ...';
//     fetch(`${url}/${nextStop}`)
//       .then((response) => {
//         if (response.status !== 200) {
//           throw new Error();
//         }

//         return response.json();
//       })
//       .then((data) => {
//         info.textContent = `Next stop ${data.name}`;
//         arriving = data.name;
//         nextStop = data.next;
//         departBtn.disabled = true;
//         arriveBtn.disabled = false;
//       })
//       .catch((err) => {
//         info.textContent = `${err}`;
//         departBtn.disabled = true;
//         arriveBtn.disabled = true;
//       });
//   }

//   function arrive() {
//     info.textContent = `Arriving at ${arriving}`;
//     departBtn.disabled = false;
//     arriveBtn.disabled = true;
//   }

//   return {
//     depart,
//     arrive,
//   };
// }

// let result = solve();
