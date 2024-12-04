// Espera o DOM estar completamente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    // Faz a requisição para buscar os dados das vagas
    fetch('jobs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const offersGrid = document.getElementById('offers-grid');
            offersGrid.innerHTML = ''; // Limpa o conteúdo inicial

            // Cria um card para cada vaga e adiciona ao grid
            data.forEach(job => {
                const card = document.createElement('article');
                card.className = 'offer-card';
                card.innerHTML = `
                    <img src="${job.image}" alt="Imagem da Vaga">
                    <h3>${job.title}</h3>
                    <p>${job.description}</p>
                    <button class="details-button" data-id="${job.id}">Detalhes</button>
                `;
                offersGrid.appendChild(card);
            });

            // Adiciona event listener aos botões de detalhes
            document.querySelectorAll('.details-button').forEach(button => {
                button.addEventListener('click', function() {
                    openModal(this.dataset.id);
                });
            });
        })
        .catch(error => console.error('Erro ao carregar os dados das vagas:', error));
});

// Função para abrir o modal com os detalhes da vaga
function openModal(id) {
    fetch('jobs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const job = data.find(j => j.id == id);

            if (job) {
                // Preenche o conteúdo do modal com os dados da vaga
                document.getElementById('modal-title').innerText = job.title;
                document.getElementById('modal-bolsa').innerText = job.bolsa;
                document.getElementById('modal-horario').innerText = job.horario;
                document.getElementById('modal-local').innerText = job.local;
                document.getElementById('modal-curso').innerText = job.curso;

                // Exibe o modal
                document.getElementById('modal').style.display = 'block';
            }
        })
        .catch(error => console.error('Erro ao carregar os detalhes da vaga:', error));
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Fecha o modal se o usuário clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}