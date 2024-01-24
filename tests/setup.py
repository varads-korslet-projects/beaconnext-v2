import subprocess
import sys
from pathlib import Path

ROOT_FOLDER = Path(__file__).resolve().parent
venv_path = ROOT_FOLDER / 'venv'
env_active = False

def create_virtual_environment():
    root_folder = ROOT_FOLDER
    
    if venv_path.exists():
        return

    try:
        print(f"Attempting to create a virtual environment 'env' in {venv_path}")
        subprocess.run([sys.executable, '-m', 'venv', str(venv_path)], check=True)
        print(f"Virtual environment 'env' created successfully")
    except subprocess.CalledProcessError as e:
        print(f"Error creating virtual environment: {e}")
        sys.exit(1)

def activate_virtual_environment():
    root_folder = ROOT_FOLDER

    if sys.platform == 'win32':
        activate_script = venv_path / 'Scripts' / 'activate'
    else:
        activate_script = venv_path / 'bin' / 'activate'

    if not activate_script.exists():
        print("Activate script not found. Ensure the virtual environment 'env' is created.")
        sys.exit(1)

    try:
        print(f"Attempting to activate virtual environment 'env'")
        subprocess.run([str(activate_script)], check=True, shell=True)
        global env_active
        env_active = True
        print("Virtual environment 'env' activated successfully")
    except subprocess.CalledProcessError as e:
        print(f"Error activating virtual environment: {e}")
        sys.exit(1)

def install_requirements():
    if not env_active:
        activate_virtual_environment()
    if env_active:
        root_folder = ROOT_FOLDER
        requirements_file = root_folder / 'requirements.txt'
        python_executable = 'python'
        if sys.platform == 'win32':
            python_executable = 'python.exe'


        if not venv_path.exists():
            print("Virtual environment 'env' not found. Please create it first.")
            sys.exit(1)

        try:
            print(f"Attempting to update pip to the latest version")
            subprocess.run(['python', '-m', 'pip', 'install', '--upgrade', 'pip'], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print("Done updating pip!")
        except subprocess.CalledProcessError as e:
            print(f"Error updating pip: {e}")
            sys.exit(1)

        if not requirements_file.exists():
            print("Requirements file 'requirements.txt' not found.")
            sys.exit(1)

        try:
            print(f"Attempting to install dependencies from 'requirements.txt'")
            subprocess.run(['pip', 'install', '-r', str(requirements_file)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print("Dependencies installed successfully")
        except subprocess.CalledProcessError as e:
            print(f"Error installing dependencies: {e}")
            sys.exit(1)

if __name__ == "__main__":
    create_virtual_environment()
    install_requirements()