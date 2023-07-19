import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv'
import fs from 'fs';
import message from "../message.js";

const texto = `
NFS-e - NOTA FISCAL DE SERVIÇOS ELETRÔNICA - RPS 1660 Série 1, emitido em: 30/03/2022   NAMAH LTDA   R TOMAZ GONZAGA, 530 APT 1800   LOURDES - Belo Horizonte - MG - 30180143   TELEFONE: 3125149565   EMAIL: CONTATO@ACENDASUALUZ.COM.BR   CNPJ: 44.713.203/0001-09   INSCRIÇÃO MUNICIPAL: 13579130012   NÚMERO DA NOTA   202200000001659   COMPETÊNCIA   30/03/2022 00:00:00   CÓDIGO DE VERIFICAÇÃO   9c9091c4   DATA DE EMISSÃO   30/03/2022 21:42:44   DADOS DO TOMADOR   NOME / RAZÃO SOCIAL   Vânia Moreira   E-MAIL   vm.vania.moreira@gmail.com   TELEFONE   16997330060   ENDEREÇO   Não informado, 01   BAIRRO / DISTRITO   Não informado   CEP   00000000   MUNICÍPIO   Belo Horizonte   UF   MG   PAÍS   Brasil   CPF / CNPJ / OUTROS   115.171.148-96   INSCRIÇÃO MUNICIPAL INSCRIÇÃO ESTADUAL   DISCRIMINAÇÃO DOS SERVIÇOS   Workshop de Autoestima.   CÓDIGO DO SERVIÇO   8.02 / 080200188 - INSTRUÇÃO E TREINAMENTO, AVALIAÇÃO DE CONHECIMENTOS DE QUAISQUER NATUREZA   MUNICÍPIO ONDE O SERVIÇO FOI PRESTADO   3106200 / Belo Horizonte   NATUREZA DA OPERAÇÃO   Tributação no municipio   REGIME ESPECIAL DE TRIBUTAÇÃO: -   VALOR DOS SERVIÇOS: 350,00   (-) DESCONTOS: 0 (-) DEDUÇÕES: 0   (-) RETENÇÕES FEDERAIS: 0,00 (=) BASE DE CÁLCULO: 350,00   (-) ISS RETIDO NA FONTE: 0 (x) ALÍQUOTA: 3,00 %   VALOR LÍQUIDO: 350,00 (=) VALOR DO ISS: R$ 10,50   RETENÇÕES FEDERAIS   PIS: R$ 0,00 COFINS: R$ 0,00 IR: R$ 0,00 CSLL: R$ 0,00 INSS: R$ 0,00   OUTRAS INFORMAÇÕES   Valor aprox dos tributos: R$ 0,00 federal, R$ 0,00 estadual e R$ 0,00 municipal Fonte: IBPT 02C353.   powered by eNotas Gateway  Retorne o resultado em formato de planilha, com as informações em colunas. `

export async function askGPT(req, res, next){
    console.log(req.body)
    dotenv.config()


    const configuration = new Configuration({
            apiKey: process.env.KEY,
    })
    const openai = new OpenAIApi(configuration)

    const history = []
    
    console.log(req.body)
    const user_input =  message + req.body.question //question("Digite seu input: ")

    const messages = [];
    for (const [input_text, completion_text] of history) {
        messages.push({ role: "user", content: input_text })
        messages.push({ role: "assistant", content: completion_text })
    }

    messages.push({ role: "user", content: user_input })

    try {
        console.log(1)
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        });

        const completion_text = completion.data.choices[0].message.content;
        console.log(completion_text);

        history.push([user_input, completion_text]);

        req.retorno = JSON.stringify(completion_text) //typeof completion_text === 'string' ? JSON.parse(completion_text) : completion_text
        next()

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}


