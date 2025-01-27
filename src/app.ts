import { ControllerMapping, buttonSvgClasses, controllerMappings } from "./controller-mappings";
import { SvgService } from "./services/svg.service";

interface GamepadState {
    currentController: ControllerMapping | null;
    lastTimestamp: number;
}

class GamepadController {
    private static readonly FPS = 30;
    private static readonly DEFAULT_VIBRATION_DURATION = 100;
    private static readonly DEFAULT_VIBRATION_MAGNITUDE = 1;

    private readonly state: GamepadState = {
        currentController: null,
        lastTimestamp: 0,
    };

    private readonly elements = {
        testButtons: document.querySelector("[data-test-buttons]") as HTMLElement,
        axisTestButtons: document.querySelector("[data-axis-test-buttons]") as HTMLElement,
        name: document.querySelector("[data-controller-name]") as HTMLElement,
        svgContainer: document.querySelector("[data-svg-container]") as HTMLElement,
        detectingScreen: document.querySelector("[data-detecting-screen]") as HTMLElement,
    };

    constructor() {
        this.bindEventListeners();
    }

    private bindEventListeners(): void {
        window.addEventListener("gamepadconnected", this.handleGamepadConnect.bind(this));
        window.addEventListener("gamepaddisconnected", this.handleGamepadDisconnect.bind(this));
        window.addEventListener("beforeunload", this.cleanup.bind(this));
        window.addEventListener("unload", this.cleanup.bind(this));
    }

    private handleGamepadConnect(event: GamepadEvent): void {
        const { gamepad } = event;
        if (!gamepad) return;

        this.detectController(gamepad);
        this.initializeVibration(gamepad);
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private handleGamepadDisconnect(): void {
        this.cleanup();
    }

    private detectController(gamepad: Gamepad): void {
        const controllerMap = new Map([
            ["Xbox", (id: string) => id.includes("Xbox")],
            ["PS3", (id: string) => id.includes("PLAYSTATION(R)3")],
            ["PS4", (id: string) => id.includes("Wireless Controller")],
            ["PS5", (id: string) => id.includes("DualSense Wireless Controller")],
            ["JoyConL", (id: string) => id.includes("Joy-Con (L)")],
            ["JoyConR", (id: string) => id.includes("Joy-Con (R)")],
            ["JoyConLR", (id: string) => id.includes("Joy-Con L+R")],
        ]);

        for (const [key, predicate] of controllerMap) {
            if (predicate(gamepad.id)) {
                this.state.currentController = controllerMappings[key];
                break;
            }
        }

        this.updateControllerDisplay();
    }

    private async updateControllerDisplay(): Promise<void> {
        const { currentController } = this.state;
        this.elements.name.textContent = currentController?.name ?? "Unknown Controller";

        if (!currentController) return;

        this.elements.testButtons.innerHTML = "";
        this.elements.axisTestButtons.innerHTML = "";
        this.elements.detectingScreen.classList.remove("active");
        await this.renderButtons(currentController);
        await this.renderAxes(currentController);
        await this.renderControllerSvg(currentController);
    }

    private async renderButtons(controller: ControllerMapping): Promise<void> {
        controller.buttons.forEach((button) => {
            const labelElement = document.createElement("label");

            Object.assign(labelElement, {
                className: "controller-button",
                id: button,
                textContent: button,
            });

            this.elements.testButtons.appendChild(labelElement);
        });
    }

    private async renderAxes(controller: ControllerMapping): Promise<void> {
        controller.axes?.forEach((axis) => {
            const axisElement = document.createElement("div");

            Object.assign(axisElement, {
                className: "controller-axis",
                id: axis,
                textContent: axis,
            });

            this.elements.axisTestButtons.appendChild(axisElement);
        });
    }

    private async renderControllerSvg(controller: ControllerMapping): Promise<void> {
        if (!controller.svg) return;

        try {
            const svgElement = await SvgService.getByUrl(`./assets/svg/${controller.svg}`);
            if (svgElement) {
                this.elements.svgContainer.innerHTML = "";
                this.elements.svgContainer.appendChild(svgElement);
            }
        } catch (error) {
            console.error("Failed to load controller SVG:", error);
        }
    }

    private updateButtonState(gamepad: Gamepad): void {
        const { currentController } = this.state;
        if (!currentController) return;

        currentController.buttons.forEach((button, index) => {
            const buttonElement = document.getElementById(button);
            const buttonState = gamepad.buttons[index]?.pressed;

            if (buttonElement && typeof buttonState === "boolean") {
                const svgButton = document.querySelector(`.button.${buttonSvgClasses[button]}`);
                buttonState && buttonElement.classList.add("button-pressed");
                svgButton?.classList.toggle("active", buttonState);
            }
        });
    }

    private updateAxisState(gamepad: Gamepad): void {
        const { currentController } = this.state;
        if (!currentController) return;

        currentController.axes?.forEach((axis, index) => {
            const axisElement = document.getElementById(axis);
            if (axisElement) {
                axisElement.textContent = `${axis}: ${gamepad.axes[index]?.toFixed(2) ?? 0}`;
            }

            // Stick X-axes are assumed to be named [L|R]SX (Left/Right Stick X)
            if (axis[1] + axis[2] === 'SX') {
                const stick = document.querySelector(`.${buttonSvgClasses[axis]}`) as HTMLElement;
                if (stick) {
                    const x = gamepad.axes[index] ?? 0;
                    // SX (Stick X) is assumed to precede stick Y
                    const y = gamepad.axes[index + 1] ?? 0;
                    stick.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
                }
            }
        });
    }

    private gameLoop(timestamp: number): void {
        if (timestamp - this.state.lastTimestamp < 1000 / GamepadController.FPS) {
            requestAnimationFrame(this.gameLoop.bind(this));
            return;
        }

        const gamepad = navigator.getGamepads().find(Boolean);
        if (gamepad) {
            if (!this.state.currentController) this.detectController(gamepad);

            this.updateButtonState(gamepad);
            this.updateAxisState(gamepad);
        }

        this.state.lastTimestamp = timestamp;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private vibrateOnVKeyPress(event: KeyboardEvent): void {
        if (event.key === "v")  this.vibrate();
    }

    private initializeVibration(gamepad: Gamepad): void {
        if (!gamepad.vibrationActuator) return;

        const existingButton = document.querySelector(".vibrate-button");
        existingButton?.remove();

        const vibrateButton = document.createElement("button");

        Object.assign(vibrateButton, {
            className: "vibrate-button",
            textContent: "Vibrate (V)"
        });

        vibrateButton.addEventListener("click", () => this.vibrate(GamepadController.DEFAULT_VIBRATION_DURATION));
        document.addEventListener("keyup", (event) => this.vibrateOnVKeyPress(event));

        document.body.appendChild(vibrateButton);
        this.vibrate(GamepadController.DEFAULT_VIBRATION_DURATION);
    }

    private vibrate(
        duration = GamepadController.DEFAULT_VIBRATION_DURATION,
        magnitude = GamepadController.DEFAULT_VIBRATION_MAGNITUDE
    ): void {
        const gamepad = navigator.getGamepads().find(Boolean);
        const actuator = gamepad?.vibrationActuator;

        actuator?.playEffect("dual-rumble", {
            duration,
            strongMagnitude: magnitude,
            weakMagnitude: magnitude,
        });

        this.elements.svgContainer?.classList.add("vibrate");
        setTimeout(() => this.elements.svgContainer.classList.remove("vibrate"), duration * 10);
    }

    private cleanup(): void {
        this.state.currentController = null;
        this.elements.name.textContent = "";
        this.elements.testButtons.innerHTML = "";
        this.elements.axisTestButtons.innerHTML = "";
        this.elements.svgContainer.innerHTML = "";
        this.elements.detectingScreen.classList.add("active");
        document.querySelector(".vibrate-button")?.remove();
        document.removeEventListener("keyup", (event) => this.vibrateOnVKeyPress(event));
    }
}

new GamepadController();
