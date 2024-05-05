const getFilters = () => {
    const filters = [
        {
            name: 'roles',
            type: 'multi_select',
            placeholder: 'Roles',
            label: 'Roles',
            options: [
                {label: 'Frontend', value: 'frontend'},
                {label: 'IOS', value: 'ios'},
                {label: 'Android', value: 'android'},
                {label: 'Backend', value: 'backend'},
                {label: 'FullStack', value: 'fullstack'},
                {label: 'Flutter', value: 'flutter'},
            ]
        },
        {
            name: 'no_employees',
            type: 'multi_select',
            placeholder: 'Number of Employees',
            label: 'No of Employees',
            options: [
                {label: '1-10', value: '1::10'},
                {label: '11-20', value: '11::20'},
                {label: '21-50', value: '21::50'},
                {label: '51-100', value: '51::100'},
                {label: '101-200', value: '101::200'},
                {label: '201-500', value: '201::500'},
                {label: '500+', value: '500'},
            ]
        },
        {
            name: 'experience',
            type: 'select',
            placeholder: 'Experience',
            label: 'Experience',
            options: [
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'},
                {label: '5', value: '5'},
                {label: '6', value: '6'},
                {label: '7', value: '7'},
                {label: '8', value: '8'},
                {label: '9', value: '9'},
                {label: '10', value: '10'},
            ]
        },
        {
            name: 'remote',
            type: 'select',
            placeholder: 'Remote',
            label: 'Remote',
            options: [
                {label: '1-10', value: '1::10'},
                {label: '11-20', value: '11::20'},
                {label: '21-50', value: '21::50'},
                {label: '51-100', value: '51::100'},
                {label: '101-200', value: '101::200'},
                {label: '201-500', value: '201::500'},
                {label: '500+', value: '500'},
            ]
        },
        {
            name: 'tech_stack',
            type: 'multi_select',
            placeholder: 'Tech Stack',
            label: 'Tech Stack',
            options: []
        },
        {
            name: 'min_base_pay',
            type: 'select',
            placeholder: 'Minimum Base Pay Salary',
            label: 'Min Base Pay',
            options: [
                {label: '0k', value: '0'},
                {label: '10k', value: '10'},
                {label: '20k', value: '20'},
                {label: '30k', value: '30'},
                {label: '40k', value: '40'},
                {label: '50k', value: '50'},
            ]
        },
        {
            name: 'search',
            type: 'search',
            placeholder: 'Search Company Name',
            label: 'Company Name',
            options: [] // from api
        }
    ];


    return {filters}
}


export default getFilters