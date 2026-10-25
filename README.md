# Gaming Controller Tester

A lightweight, browser-based tool for testing and visualizing gamepad inputs. This application helps developers and users test their game controllers by providing real-time visual feedback for button presses, analog stick movements, and controller vibration.

## Features

- 🎮 Real-time controller input visualization
- 🕹️ Support for multiple controller types
- 📊 Analog stick position tracking
- 📱 Button press detection
- 💫 Controller vibration testing
- 🎯 Visual feedback through SVG overlays

## Controller Compatibility

| Controller | Status | Button Mapped | Analog Support | Vibration | Svg Mapped |
|------------|--------|----------------|----------------|-----------| ------- |
| Xbox Controller | 🟧 Partial | ✅ | ✅ | ✅ | 🟥 |
| PS3 Controller | 🟧 Partial | ✅ | ✅ | ✅ | 🟥 |
| PS4 Controller | ✅ Full |✅ | ✅ | ✅ | ✅ |
| PS5 DualSense | 🟧 Partial | ✅ | ✅ | ✅ | 🟥 |
| Nintendo Joy-Con (L) | ✅ Full | ✅ | ✅ | ✅ | ✅ |
| Nintendo Joy-Con (R) | ✅ Full | ✅ | ✅ | ✅ | ✅ |
| Nintendo Joy-Con Pair | ✅ Full | ✅ | ✅ | ✅ | ✅ |

## Getting Started

### Prerequisites

- Modern web browser with Gamepad API support
- Compatible game controller
- Node.js and npm (for development)

## Usage

1. Connect your controller to your computer via Bluetooth
2. Open the Gaming Controller Tester in your web browser
3. The application will automatically detect your controller
4. Test buttons, analog sticks, and vibration functionality
5. Visual feedback will be displayed on screen for each input

### Demo

- [Check on Github Pages](https://pmanikas.github.io/controller-tester/)

You can also use [Quick Gamepad Test](https://quick-gamepadtest.online/) as a free browser-based gamepad tester to check controller buttons, triggers, analog sticks, stick drift, and vibration without installing any software.

## Development

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/controller-tester.git
    cd controller-tester
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open your browser and navigate to `http://localhost:9000`

### Project Structure

``` bash
controller-tester
├── src/
│   ├── assets
│   │   └── styles
│   │   └── svg
│   ├── services
│   ├── utils
│   ├── app.ts
│   ├── controller-mappings.ts
│   └── index.html
```

### Building

To build the project for production:

```bash
npm run build
```

## Technical Details

- Written in TypeScript
- Uses Gamepad API for controller input
- SVG-based visualization
- 30 FPS input polling
- Support for vibration API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all testers
- SVG illustrations for controllers

## Support

For support, please create an issue in the GitHub repository or contact the maintainers.
