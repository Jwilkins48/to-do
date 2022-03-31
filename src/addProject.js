let loadProject = () => {
    const addNewProjectBtn = document.getElementById('addNewProjectBtn');
    const projectDisplayContainer = document.getElementById('projectDisplayContainer');
    const projectForm = document.getElementById('projectForm');
    const projectNameInput = document.getElementById('projectName');
    const projectSubmitBtn = document.getElementById('projectSubmitBtn');

    let projectList = [];

    let renderProject = (proj) => {
        const projItem = document.querySelector(`[data-key='${proj.id}']`);
        if (projItem.deleted) {
            //remove from DOM
            item.remove();
            if (projectList.length === 0) list.innerHTML = '';
            return;
        };

        const projDisplay = document.createElement('div');
        projDisplay.setAttribute('data-key', proj.id);
        //Set content
        projDisplay.innerHTML = `${proj.text} <button class="delete-proj js-delete-proj">
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
            projectNameInput.value = '';
            hideModal();
        }
    });

    //Display project modal
    let showModal = () => {
        projectForm.classList.add('active');
    }
    let hideModal = () => {
        projectForm.classList.remove('active');
        console.log('hi');
    }

    addNewProjectBtn.addEventListener('click', showModal());

}
export default loadProject;