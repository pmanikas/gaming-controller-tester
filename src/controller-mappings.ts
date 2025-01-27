export interface ControllerMapping {
    name: string;
    buttons: string[];
    axes?: string[];
    svg?: string;
}

export const controllerMappings: { [key: string]: ControllerMapping } = {
    'Xbox': {
        name: 'Xbox Controller',
        buttons: ['A', 'B', 'X', 'Y', 'LB', 'RB', 'LT', 'RT', 'Back', 'Start', 'LS', 'RS', 'DPadUp', 'DPadDown', 'DPadLeft', 'DPadRight'],
        axes: ['LSX', 'LSY', 'RSX', 'RSY']
    },
    'PS3': {
        name: 'PlayStation 3 Controller',
        buttons: ['Cross', 'Circle', 'Square', 'Triangle', 'L1', 'R1', 'L2', 'R2', 'Select', 'Start', 'L3', 'R3', 'PS', 'Up', 'Down', 'Left', 'Right'],
        axes: ['LSX', 'LSY', 'RSX', 'RSY']
    },
    'PS4': {
        name: 'PlayStation 4 Controller',
        buttons: ['Cross', 'Circle', 'Triangle', 'Square', 'L1', 'R1', 'L2', 'R2', 'Share', 'Options', 'PS', 'L3', 'R3', 'DPadUp', 'DPadDown', 'DPadLeft', 'DPadRight', 'Touchpad'],
        axes: ['LSX', 'LSY', 'VL2', 'RSX', 'RSY', 'VR2'],
        svg: 'dual-shock-4.svg'
    },
    'PS5': {
        name: 'PlayStation 5 Controller',
        buttons: ['Cross', 'Circle', 'Square', 'Triangle', 'L1', 'R1', 'L2', 'R2', 'Create', 'Options', 'L3', 'R3', 'DPadUp', 'DPadDown', 'DPadLeft', 'DPadRight'],
        axes: ['LSX', 'LSY', 'RSX', 'RSY']
    },
    'JoyConL': {
        name: 'Joy-Con (L)',
        buttons: ['Left', 'Down', 'Up', 'Right', 'SL', 'SR', 'ZL', '?1', 'L', 'Minus', 'LS','?2', '?3', '?4', '?5', '?6', 'Capture'],
        axes: ['LSX', 'LSY'],
        svg: 'joy-con.svg'
    },
    'JoyConR': {
        name: 'Joy-Con (R)',
        buttons: ['A', 'X', 'B', 'Y', 'SL', 'SR', '?1', 'ZR', 'R', 'Plus', 'RS', '?3', '?4', '?5', '?6', '?7', 'Home'],
        axes: ['RSX', 'RSY'],
        svg: 'joy-con.svg'
    },
    'JoyConLR': {
        name: 'Joy-Con L+R',
        buttons: ['B', 'A', 'Y', 'X', 'L', 'R', 'ZL', 'ZR', 'Minus', 'Plus', 'L3', 'R3', 'Up', 'Down', 'Left', 'Right', 'Home', 'Capture', 'SL', 'SR', 'LS', 'RS'],
        axes: ['LSX', 'LSY', 'RSX', 'RSY'],
        svg: 'joy-con.svg'
    }
}

export const buttonSvgClasses: { [key: string]: string } = {
    'L3': 'button-l3',
    'R3': 'button-r3',
    'DPadUp': 'button-dpad-up',
    'DPadDown': 'button-dpad-down',
    'DPadLeft': 'button-dpad-left',
    'DPadRight': 'button-dpad-right',
    'Triangle': 'button-triangle',
    'Circle': 'button-circle',
    'Cross': 'button-cross',
    'Square': 'button-square',
    'L1': 'button-l1',
    'R1': 'button-r1',
    'L2': 'button-l2',
    'R2': 'button-r2',
    'PS': 'button-ps',
    'Touchpad': 'button-touchpad',
    'Share': 'button-share',
    'Options': 'button-options',
    'B': 'button-b',
    'A': 'button-a',
    'Y': 'button-y',
    'X': 'button-x',
    'L': 'button-l',
    'R': 'button-r',
    'ZL': 'button-zl',
    'ZR': 'button-zr',
    'Minus': 'button-minus',
    'Plus': 'button-plus',
    'LS': 'button-ls',
    'RS': 'button-rs',
    'Up': 'button-up',
    'Down': 'button-down',
    'Left': 'button-left',
    'Right': 'button-right',
    'Home': 'button-home',
    'Capture': 'button-capture',
    'LSX': 'axis-l-container', 
    'LSY': 'axis-l-container', 
    'RSX': 'axis-r-container', 
    'RSY': 'axis-r-container'
}