// import * as React from "react";

// export class FlexTable extends React.Component<TableProps, {}> {
//     constructor(props: TableProps) {
//         super(props)
//       }

//     private columns: Column[] | any[];
//     private settings: TableSettings;
//     private className: string;
//     private defaultSettings: TableSettings = {
//         header: true,
//         noRowsMessage: 'No items',
//         classPrefix: 'json',
//     };

//     public render(){

//         this.createSettings();
//         this.columns = this.createColumns();
//         this.className = this.props.className || `${this.settings.classPrefix}Table`;


//         let header = this.settings.header ? <Header settings={this.settings} columns={this.columns} onClickHeader={this.props.onClickHeader}/> : null;

//         let table = <table className={this.className}>
//             {header}
//             <Body settings={this.settings} columns={this.columns} rows={this.props.rows} onClickRow={this.props.onClickRow} onClickCell={this.props.onClickCell}/>
//             <Footer/>
//         </table>;

//         return this.settings.freezeHeader ?
//             <div className="scrollingtable">
//                 <div>
//                     <div>{table}</div>
//                 </div>
//             </div> : table;
//     }

//     private createSettings(){
//         if(this.props.settings) {
//             this.settings = this.props.settings;
//         }else{
//             this.settings = this.defaultSettings;
//         }
//         if(this.settings.header == null ) this.settings.header = true;
//         if(this.settings.noRowsMessage == null ) this.settings.noRowsMessage = this.defaultSettings.noRowsMessage;
//         if(this.settings.classPrefix == null ) this.settings.classPrefix = this.defaultSettings.classPrefix;
//     }

//     private createColumns(): Column[] | any[]{

//         if(!this.props.rows || this.props.rows.length === 0) {
//             return [];
//         }

//         if(!this.props.columns){
//             return Object.keys(this.props.rows[0]).map(key =>{
//                 return {key: key, label: key, cell: this.props.cellRenderer || key}
//             });
//         }

//         return this.props.columns.map(column =>{
//             if( typeof column == 'string' ){
//                 return {
//                     key: column,
//                     label: column,
//                     cell: this.props.cellRenderer || column
//                 };
//             }
//             if( typeof column == 'object' ){
//                 let key = column.key || column.label;

//                 return {
//                     key: key,
//                     label: column.label || key,
//                     cell: this.props.cellRenderer || column.cell || key
//                 };
//             }

//         });
//     }
// }

// class Body extends React.Component<BodyProps, {}> {
//     public render(){
//         let rows = this.props.rows && this.props.rows.length > 0 ?
//             this.props.rows.map((row: any, index: number) =>{
//                 let key = `trjt-tr-${index}`;
//                 return <Row row={row} columns={this.props.columns} onClickCell={this.props.onClickCell} onClickRow={this.props.onClickRow} index={index} key={key} reactKey={key} settings={this.props.settings}/>;
//             }):
//             <tr><td>{this.props.settings.noRowsMessage}</td></tr>;
//         return <tbody>{rows}</tbody>;
//     }
// }

// class Row extends React.Component<RowProps, {}> {

//     public render(){
//         let classPrefix = this.props.settings.classPrefix;
//         let rowClass = this.props.settings.rowClass;
//         let className = `${classPrefix}Row ${classPrefix}${this.props.index % 2 ? 'Odd' : 'Even'}`;

//         if(rowClass) {
//             className = rowClass(className, this.props.row);
//         }


//         return <tr className={className} key={this.props.reactKey} onClick={this.onClick.bind(this, this.props.row)}>
//             {this.props.columns.map((column: Column | any, index: number) =>{
//                 // let item: any;
//                 // if(typeof column.cell == 'function'){
//                 //     item = column.cell(this.props.row, column.key);
//                 // }else if(this.props.settings.)
//                 let item = typeof column.cell == 'function' ? column.cell(this.props.row, column.key) : this.props.row[column.cell];
//                 let key = `${this.props.reactKey}-td-${index}`;
//                 return <Cell onClickCell={this.props.onClickCell} settings={this.props.settings} item={item} column={column} key={key} reactKey={key} row={this.props.row}/>;
//             })}
//         </tr>;
//     }

//     private onClick(item, e){
//         if(this.props.onClickRow){
//             this.props.onClickRow(e, item);
//         }
//     }
// }

// class Cell extends React.Component<CellProps, {}> {
//     public render(){
//         let classPrefix = this.props.settings.classPrefix;
//         let cellClass = this.props.settings.cellClass;
//         let className = `${classPrefix}Cell ${classPrefix}Cell_${this.props.column.key}`;
//         if(cellClass) {
//             className = cellClass(className, this.props.column.key, this.props.row);
//         }
//         return <td
//             className={className}
//             key={this.props.reactKey}
//             data-key={this.props.column.key}
//             onClick={this.onClick.bind(this, this.props.column.key, this.props.item)}>
//             {this.props.item}
//         </td>;
//     }

//     private onClick(key, item, e){
//         if(this.props.onClickCell){
//             this.props.onClickCell(e, key, item);
//         }
//     }
// }

// class Header extends React.Component<HeaderProps, {}> {
//     public render(){
//         let th = this.props.settings.freezeHeader ? <th className="scrollbarhead"></th> : null;
//         return <thead><tr>
//             {this.props.columns.map((column: any, index: number) =>{
//                 let key = `trjt-th-${index}`;
//                 return <HeaderCell settings={this.props.settings} column={column} reactKey={key} key={key} onClickHeader={this.props.onClickHeader}/>;
//             })}
//             {th}</tr>
//         </thead>;
//     }

// }

// class HeaderCell extends React.Component<HeaderCellProps, {}> {
//     public render(){
//         let classPrefix = this.props.settings.classPrefix;
//         let headerClass = this.props.settings.headerClass;
//         let className = `${classPrefix}Column`;
//         if(headerClass) {
//             className = headerClass(className, this.props.column.key);
//         }
//         //let content = this.props.settings.freezeHeader ? <div itemProp={this.props.column.label}></div> : this.props.column.label;
//         let content = this.props.settings.freezeHeader ? <div><div>{this.props.column.label}</div><div>{this.props.column.label}</div></div> : this.props.column.label;
//         return <th className={className} onClick={this.onClick.bind(this, this.props.column.key)} data-key={this.props.column.key}>{content}</th>;
//     }

//     private onClick(key, e){
//         if(this.props.onClickHeader){
//             this.props.onClickHeader(e, key);
//         }
//     }

// }

// class Footer extends React.Component<any, {}> {
//     public render(){
//         return <tfoot/>;
//     }
// }
// // module.exports = FlexTable;