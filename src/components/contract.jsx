import { Button, Input, Select, DatePicker } from "antd";
import { ShoppingCartOutlined, MinusOutlined, PlusOutlined, ThunderboltOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useContext, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { ReactComponent as Pix } from '../pix.svg';
import Context from "../context/cartContext";
import locale from 'antd/es/date-picker/locale/pt_BR';


export default function Contract({ set = () => { } }) {
    //     let imageData = localStorage.getItem('imageData');
    // let img = new Image();
    // img.src = imageData;
    // document.body.appendChild(img);

    const imagem = localStorage.getItem('imagem');
    const valor = localStorage.getItem('valor');
    const profissional = localStorage.getItem('profit');
    const [value, setValue] = useState('1');
    const [diario, setDiario] = useState(true);
    const [diurno, setDiurno] = useState(true);
    const [total, setTotal] = useState(Number(valor));
    const [uteis, setUteis] = useState(0);
    const [sabados, setSabados] = useState(0);
    const [domingos, setDomingos] = useState(0);
    const {cartItens, setCartItens} = useContext(Context);
    const [datas, setDatas] = useState([]);
    const [observ, setObserv] = useState('');

    const handleChange = (value) => {
        // console.log(`selected ${value}`);
    };
    const onChangeDate = (date, dateString) => {
        setDatas(dateString);
        let sabado = 0;
        let domingo = 0;
        let diasUteis = 0;
        let soma = 0;

        dateString.forEach(data => {
            let [dia, mes, ano] = data.split('/');
            let dataFormatada = `${mes}/${dia}/${ano}`;
        
            let diaDaSemana = new Date(dataFormatada).getDay();
            switch (diaDaSemana) {
                case 0: // Domingo
                    domingo++;
                    break;
                case 6: // Sábado
                    sabado++;
                    break;
                default: // Dias úteis
                    diasUteis++;
            }
        });
        setSabados(Number(sabado));
        setDomingos(Number(domingo));
        setUteis(Number(diasUteis));
        if(diasUteis>0){
            soma=diasUteis*Number(valor);
        }
        if(sabado>0){
            soma+=1.702*(Number(valor))*sabado;
        }

        if(domingo>0){
            soma+=2*(Number(valor)*domingo);
        }
        setTotal(soma);
    };

    const handleBlur = (value, onChange) => () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    const handleIncrement = () => {
        const newValue = Number(value) + 1;
        setValue(newValue.toString());
        setTotal(total + Number(valor))
    };

    const handleDecrement = () => {
        const newValue = Number(value) - 1;
        if (newValue >= 1) {
            setValue(newValue.toString());
            if (total > Number(valor)) setTotal(total - Number(valor));
        }
    };

    const AddCart = () =>{
        const newItem = [];
        newItem.tipo = imagem;
        newItem.prof = value;
        newItem.uteis = uteis;
        newItem.sabados = sabados;
        newItem.domingos = domingos;
        newItem.datas = datas;
        newItem.total = total;
        newItem.observ = observ;

        setCartItens([...cartItens, {item: newItem}]);
        console.log(cartItens);
        set((old) => !old);
    }

    return (
        <>
            <div style={{ display: "flex", width: "100%", paddingTop: "8rem", backgroundColor: "white" }}>
            <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} onClick={() => set((old) => !old)}/>
                <section style={{ display: "flex", width: "50%", flexDirection: "column", justifyContent: "space-around", height: "50vh", padding: "1rem" }}>
                    <img src={profissional} alt="imagemProfissional" />
                    <h4>Descriçao do cargo</h4>
                    <p style={{ textAlign: "justify" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.</p>
                </section>
                <section style={{ textAlign: "left", padding: "1rem" }}>
                    <h2>{imagem}</h2>
                    <h3>A Partir de</h3>
                    <h3>R$ {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    <h4>{(valor * 1.11).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} em até 12x sem juros no cartão <br /><b>Economize</b> 40% ou mais na modalidade mensal</h4>
                    <h3>Modalidade de Contratação*</h3>
                    <div style={{ display: "flex", width: "60%", justifyContent: "space-between" }}>
                        <Button style={{ width: "45%" }} type={diario ? "primary" : "default"} size="large"
                            onClick={() => {
                                if (!diario) {
                                    if (total !== valor) setTotal(total / 15);
                                    setDiario(true)
                                }
                            }}>Diario</Button>
                        <Button
                            style={{ width: "45%" }}
                            type={!diario ? "primary" : "default"}
                            size="large"
                            onClick={() => {
                                if (diario) {
                                    setDiario((old) => !old)
                                    setTotal(total * 15);
                                }
                            }
                            }>
                            Mensal
                        </Button>
                    </div>
                    <h3>Turno*</h3>
                    <div style={{ display: "flex", width: "60%", justifyContent: "space-between" }}>
                        <Button style={{ width: "45%" }} type={diurno ? "primary" : "default"} size="large"
                            onClick={() => {
                                if (!diurno) {
                                    setTotal(total / 1.12);
                                    setDiurno(true)
                                }
                            }}>Diurno</Button>
                        <Button style={{ width: "45%" }} type={!diurno ? "primary" : "default"} size="large"
                            onClick={() => {
                                if (diurno) {
                                    setTotal(total * 1.12);
                                    setDiurno(false)
                                }
                            }}>Noturno</Button>
                    </div>
                    <h3>Quantidade de Profissionais</h3>
                    <div
                        className="containerH"
                        style={{
                            // backgroundColor: "#6D0AD7",
                            width: "12rem",
                            borderRadius: ".75rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <button
                            style={{
                                height: "2rem",
                                width: "2rem",
                                // backgroundColor: "#6D0AD7",
                                color: "white",
                                border: "transparent",
                                borderTopLeftRadius: "0.75rem",
                                borderBottomLeftRadius: "0.75rem",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onClick={handleDecrement}
                            disabled={value === 1}
                        ><b><MinusOutlined style={{ fontWeight: "900", color: "black" }} /></b></button>

                        <Input
                            // className="buttonNewsP"
                            style={{
                                height: "2rem",
                                width: "6rem",
                                // backgroundColor: "#6D0AD7",
                                color: "black",
                                border: "1px solid black",
                                textAlign: "center",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"

                            }}
                            value={value}
                            onChange={handleChange(setValue)}
                            onBlur={handleBlur(value, setValue)}
                        />
                        <button
                            style={{
                                height: "2rem",
                                width: "2rem",
                                // backgroundColor: "#6D0AD7",
                                color: "black",
                                borderTopRightRadius: "0.75rem",
                                borderBottomRightRadius: "0.75rem",
                                border: "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"

                            }}
                            onClick={handleIncrement}
                        ><b><PlusOutlined style={{ fontWeight: "900", color: "black" }} /></b></button>
                    </div>
                    <h3>Estado de Implantação *</h3>
                    <Select
                        style={{
                            width: 120,
                        }}
                        size="large"
                        onChange={handleChange}
                        options={[
                            { value: "AC", label: "AC" },
                            { value: "AL", label: "AL" },
                            { value: "AM", label: "AM" },
                            { value: "AP", label: "AP" },
                            { value: "BA", label: "BA" },
                            { value: "CE", label: "CE" },
                            { value: "DF", label: "DF" },
                            { value: "ES", label: "ES" },
                            { value: "GO", label: "GO" },
                            { value: "MA", label: "MA" },
                            { value: "MG", label: "MG" },
                            { value: "MS", label: "MS" },
                            { value: "MT", label: "MT" },
                            { value: "PA", label: "PA" },
                            { value: "PB", label: "PB" },
                            { value: "PE", label: "PE" },
                            { value: "PI", label: "PI" },
                            { value: "PR", label: "PR" },
                            { value: "RJ", label: "RJ" },
                            { value: "RN", label: "RN" },
                            { value: "RO", label: "RO" },
                            { value: "RR", label: "RR" },
                            { value: "RS", label: "RS" },
                            { value: "SC", label: "SC" },
                            { value: "SE", label: "SE" },
                            { value: "SP", label: "SP" },
                            { value: "TO", label: "TO" }
                        ]} />
                    {diario &&
                        <>
                            <br />
                            <br />
                            <br />
                            <DatePicker
                                multiple
                                onChange={onChangeDate}
                                maxTagCount="responsive"
                                // defaultValue={defaultValue}
                                placeholder="Escolha os dias"
                                size="large"
                                locale={locale}
                                format="DD/MM/YYYY"
                            />
                            <div 
                                className="pai">
                                <div className="filha">
                                    <h3>DIAS ÚTEIS</h3>
                                    <h4>{Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                                    <h2>{uteis}</h2>
                                </div>
                                <div className="filha">
                                    <h3>SÁBADOS</h3>
                                    <h4>{(1.702*Number(valor)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                                    <h2>{sabados}</h2>
                                </div>
                                <div className="filha">
                                    <h3>DOMINGOS</h3>
                                    <h4>{(2*Number(valor)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                                    <h2>{domingos}</h2>
                                </div>
                                <div className="filha">
                                    <h3>FERIADOS</h3>
                                    <h4>{(2*Number(valor)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                                    <h2>0</h2>
                                </div>
                            </div>
                        </>
                    }
                    <h3>Observaçao</h3>
                    <TextArea rows={6} style={{ resize: "none" }} placeholder='Preciso de profissionais de...' onChange={(e) => setObserv(e.target.value)}/>

                    <h2>TOTAL</h2>
                    <h1>R$ {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}<Pix /></h1>
                    <h2>ou R$ {(total * 1.11).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} em até 12x sem juros </h2>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <Button size="large" type={"primary"} style={{ width: "90%" }} onClick={() => AddCart()}>Adicionar ao carrinho <ShoppingCartOutlined />+</Button><br />
                        <Button size="large" type={"primary"} style={{ width: "90%" }}>Contratar Agora<ThunderboltOutlined /></Button>
                    </div>

                </section>

            </div>

            <h2>Por que tercerizar mão de obra?</h2>
            <div style={{ display: "flex" }}>
                <p><b>Otimização de Tempo</b> <br />
                    Deixe os processos burocráticos de lado e concentre seu tempo e esforço nas atividades que realmente importam para sua empresa.</p>
                <p><b>Garantia de eficiência </b><br />
                    Você garante mão de obra qualificada para qualquer área do seu negócio, sem se esforçar em recrutamento e seleção.</p>

                <p><b>Custo-benefício</b> <br />
                    Você economiza dinheiro que seria gasto com a contratação, treinamento, benefícios, etc.</p>

                <p><b>Redução de riscos</b> <br />
                    A responsabilidade por questões trabalhistas, como demissões, benefícios e conformidade com as leis trabalhistas, é toda nossa.</p>
            </div>
        </>
    )
}