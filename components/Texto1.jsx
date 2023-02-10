import React, {useState} from 'react'
import getApiValues from './getApiValues'
import './statics/Text.css'

function returnFragment(value){
	return <React.Fragment>
		<span class="num_ver">{`  ${value.number}.`}</span>{`${value.text}`}
	</React.Fragment>
}
function ShowTextValue(resp,SetText, versiculo){
	let retorno = [];
	let template = {msg: 'Chapter not found'}
	if(template === resp){
		SetText("Capitulo não encontrado!")
		return ;
	}
	if (versiculo === null){
		resp.verses.forEach((value, index)=>{
			retorno[index] = returnFragment(value)	
			/*<span key={value.number} class="versiculo" style={{display:'flex'}}>*/
				})
			
	}else if (versiculo.length === 1){
		resp.verses.forEach((value, index)=>{
			if (parseInt(versiculo[0]) === parseInt(value.number)){
					retorno[index] = returnFragment(value)}
			})
	}else{
		resp.verses.forEach((value, index)=>{
			if (parseInt(versiculo[0]) <= parseInt(value.number)){
				if (parseInt(versiculo[1]) >= parseInt(value.number)) {
					retorno[index] = returnFragment(value)
				}
			}
		})
	}
	
	SetText(retorno)
}
export default (props) =>{
	const [showText,SetText] = useState(props.text);

	if (props.call === 1){
		let capitulo = props.capther
		let versiculo = null;
		if (capitulo.search(":") > -1){
			capitulo = capitulo.split(":")[0]
			try{
				versiculo = props.capther.toString().split(":")[1].split('-');
			}catch{
				versiculo = null;
			}
		}else{
			capitulo = props.capther;
		}
		
		getApiValues.ShowCaptherValue(props.book,capitulo)
		.then(resp => ShowTextValue(resp,SetText, versiculo))
		.catch(resp => SetText("Capitulo não encontrado!"));
		props.setCall(0);
	}
	return (
		<div className="PalavraLivro">{showText}</div>
		)

}
