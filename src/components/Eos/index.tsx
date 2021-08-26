export * from "./Games";
export * from "../../Config";

// Token must be save securely.
// const defaultPrivateKey = "5JvLodQJeoyQ2JhrMFaykcMs4BQx2ZGzhYnRG4pyRNosCiWQ21P"; // main account
// const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

// const rpc = new JsonRpc("http://127.0.0.1:8888", {}); // {} default fetch.
// const api = new Api({
//   rpc,
//   signatureProvider,
//   textDecoder: new TextDecoder(),
//   textEncoder: new TextEncoder(),
// });

// class EosConfig extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       head_block: props.initialBlock,
//       eos: {
//         rpc: rpc,
//         api: api,
//       },
//       time: new Date().toLocaleString(),
//       table: [],
//     };
//   }export * from "./translate";

//   componentDidMount(this) {
//     this.blockInterval = setInterval(() => {
//       this.tick();
//     }, 500);
//     this.clockInterval = setInterval(() => {
//       this.setTime();
//     }, 1000);
//     this.getRowByIndex();
//   }

//   componentWillUnmount(this) {
//     clearInterval(this.clockInterval);
//     clearInterval(this.blockInterval);
//   }

//   getAccount(input) {
//     rpc
//       .get_account(input)
//       .then((x) => {
//         console.log(x);
//       })
//       .catch((err) => new RpcError(err));
//   }

//   getActionAdd(input = {}) {
//     console.log("Action Add");
//   }

//   tick(this) {
//     this.state.eos.rpc
//       .get_account("game.rank")
//       .then((x) => {
//         this.setState({ head_block: x.head_block_num });
//       })
//       .catch((err) => new RpcError(err));
//   }

//   getRowByIndex(this) {
//     this.state.eos.rpc
//       .get_table_rows({
//         json: true, // Get the response as json
//         code: "game.rank", // Contract that we target
//         scope: "game.rank", // Account that owns the data
//         table: "ranks", // Table name
//         lower_bound: "12345", // Table primary key value
//         // limit: 1, // Here we limit to 1 to get only the
//         reverse: false, // Optional: Get reversed data
//         show_payer: false, // Optional: Show ram payer
//       })
//       .then((res) => {
//         // console.log(res.rows);
//         res.rows.map((x) => {
//           console.log(x.id);
//         });
//         this.setState({ table: res.rows });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   setTime(this) {
//     this.setState({ time: new Date().toLocaleString() });
//   }

//   render(this) {
//     return (
//       <div className="col-12" id="eos-net-config">
//         <h1>EOS Net</h1>
//         {/* <span>{this.state.time}</span>
//         <span>{this.state.head_block}</span>
//         <br />
//         <span>
//           Game Ranking List
//           {this.state.table.map((x) => {
//             return <h5 key={x.id}> {x.id}</h5>;
//           })}
//         </span> */}
//       </div>
//     );
//   }
// }

// export default EosConfig;
