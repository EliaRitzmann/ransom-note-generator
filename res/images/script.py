import os
from PIL import Image

def convert_to_webp(image_path, output_dir, quality=80):
    """
    Converts an image to WebP format and saves it in the specified output directory.

    Args:
        image_path (str): The absolute path to the input image file.
        output_dir (str): The absolute path to the output directory for the WebP image.
        quality (int, optional): The quality of the WebP image (0-100). Defaults to 80.
    """
    try:
        img = Image.open(image_path)
        filename, _ = os.path.splitext(os.path.basename(image_path))
        webp_filename = f"{filename}.png"
        os.makedirs(output_dir, exist_ok=True)
        webp_filepath = os.path.join(output_dir, webp_filename)
        img.save(webp_filepath, "png", quality=quality)
        print(f"Converted '{os.path.basename(image_path)}' to '{webp_filename}' in '{output_dir}'")
    except FileNotFoundError:
        print(f"Error: Image not found at '{image_path}'")
    except Exception as e:
        print(f"Error processing '{os.path.basename(image_path)}': {e}")

def convert_directory_to_webp(root_dir, input_subdir="characters", output_subdir="webp", quality=80):
    """
    Converts all images in the 'characters' subdirectory (relative to the script)
    to WebP format and saves them in a 'webp' subdirectory (relative to the script),
    maintaining the internal folder structure.

    Args:
        root_dir (str): The absolute path to the directory containing the script.
        input_subdir (str, optional): The name of the input subdirectory. Defaults to "characters".
        output_subdir (str, optional): The name of the output subdirectory. Defaults to "webp".
        quality (int, optional): The quality of the WebP images (0-100). Defaults to 80.
    """
    input_path = os.path.join(root_dir, input_subdir)
    output_path = os.path.join(root_dir, output_subdir)

    if not os.path.isdir(input_path):
        print(f"Error: Input directory '{input_path}' not found.")
        return

    print(f"Converting images from '{input_path}' to '{output_path}' with quality {quality}...")

    for root, _, files in os.walk(input_path):
        for file in files:
            if file.lower().endswith(('.png', '.webp', '.jpeg', '.gif')):
                image_path = os.path.join(root, file)
                # Create corresponding subdirectory in the output directory
                relative_path = os.path.relpath(root, input_path)
                current_output_dir = os.path.join(output_path, relative_path)
                convert_to_webp(image_path, current_output_dir, quality)

    print("Conversion complete.")

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    quality_level = int(input("Enter the WebP quality level (0-100, default is 80): ") or 80)

    convert_directory_to_webp(script_dir, quality=quality_level)