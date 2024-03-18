import axios from 'axios';
import Chart from 'chart.js/auto'; 

// Função para buscar dados da API
async function fetchData() {
    try {
        const response = await axios.get('sua_url_da_api_aqui');
        const data = response.data;

        // Extrair os dados que você deseja usar no gráfico

        const labels = data.map((item: any) => item.label); 
        
        // Suponha que a API retorna um array de objetos com uma propriedade 'label'
        
        const values = data.map((item: any) => item.value); 
       
        // Suponha que a API retorna um array de objetos com uma propriedade 'value'
        
        const lastData = data[data.length - 1]; 
        
        // Último dado da API

        // Renderizar o gráfico
        renderChart(labels, values);

        // Atualizar os campos com o último dado da API
        updateFields(lastData);
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Função para renderizar o gráfico

function renderChart(labels: string[], values: number[]) {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dados da API',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Eixo X'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Eixo Y'
                    }
                }
            }
        }
    });
}

// Função para atualizar os campos com o último dado da API

function updateFields(lastData: any) {
    const textWrapper6 = document.querySelector('.text-wrapper-6') as HTMLElement;
    const textWrapper7 = document.querySelector('.text-wrapper-7') as HTMLElement;

    if (lastData) {
        textWrapper6.textContent = lastData.date; 
        // Supondo que a API retorna uma propriedade 'date'
        textWrapper7.textContent = `R$${lastData.value.toFixed(2)}`;
         // Supondo que a API retorna uma propriedade 'value'
    }
}


window.onload = fetchData;
