let loadProject = () => {
    const addNewProjectBtn = document.getElementById('addNewProjectBtn');
    const projectDisplayContainer = document.getElementById('projectDisplayContainer');
    const projectForm = document.getElementById('projectForm');
    const projectNameInput = document.getElementById('projectName');
    const projectSubmitBtn = document.getElementById('projectSubmitBtn');
    const projectCloseBtn = document.getElementById('projectCloseBtn');
    const appTitle = document.getElementById('appTitle');

    let projectList = [];

    let renderProject = (proj) => {
        const projItem = document.querySelector(`[data-key='${proj.id}']`);
        //Create project display
        const projDisplay = document.createElement('div');
        projDisplay.setAttribute('data-key', proj.id);
        projDisplay.setAttribute('class', 'projDisplay');
        projDisplay.addEventListener('click', () => {
            appTitle.innerHTML = projectNameInput.value;
        });
        //Set content
        projDisplay.innerHTML = `${proj.text} <button class="delete-proj js-delete-proj">X
        </button>`;
        //Append list if it doesn't already exist
        if (projItem) {
            //replace if not
            projectDisplayContainer.replaceChild(projDisplay, projItem);
        } else {
            projectDisplayContainer.appendChild(projDisplay);
        }
    }

    let addProj = (text) => {
        const newProject = {
            text,
            id: Date.now(),
        };
        //push into array
        projectList.push(newProject);
        renderProject(newProject);
    };

    //Submit Project
    projectSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const text = projectNameInput.value.trim();
        if (text !== '') {
            addProj(text);
            projectNameInput.innerHTML = '';
            hideModal();
        }
    });
    //Hide project modal
    let hideModal = () => {
        projectForm.classList.remove('active');
    }

    projectCloseBtn.addEventListener('click', hideModal)

    addNewProjectBtn.addEventListener('click', () => {
        projectForm.classList.add('active');
    });
}
export default loadProject;