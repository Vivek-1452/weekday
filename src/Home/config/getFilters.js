const getFilters = () => {
    const filters = [
        {
            name: 'jobRole',
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
            name: 'minExp',
            type: 'select',
            placeholder: 'Experience',
            label: 'Experience',
            options: [
                {label: '0 years', value: '0'},
                {label: '1 years', value: '1'},
                {label: '2 years', value: '2'},
                {label: '3 years', value: '3'},
                {label: '4 years', value: '4'},
                {label: '5 years', value: '5'},
                {label: '6 years', value: '6'},
                {label: '7 years', value: '7'},
                {label: '8 years', value: '8'},
                {label: '9 years', value: '9'},
                {label: '10 years', value: '10'},
            ]
        },
        {
            name: 'location',
            type: 'multi_select',
            placeholder: 'Remote',
            label: 'Remote',
            options: [
                {label: 'Remote', value: 'remote'},
                {label: 'Hybrid', value: 'hybrid'},
                {label: 'In-Office', value: 'others'},
            ]
        },
        {
            name: 'tech_stack',
            type: 'multi_select',
            placeholder: 'Tech Stack',
            label: 'Tech Stack',
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
            name: 'minJdSalary',
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
        }
    ];


    return {filters}
}


export default getFilters