import os
import zipfile
import shutil
import subprocess

root_dir = r"C:\Users\A1497335\ai-projekty\sss-gpt"
web_dir = os.path.join(root_dir, "apps", "web")
dist_dir = os.path.join(web_dir, "dist")
plugin_dir = os.path.join(web_dir, "public", "wordpress-plugin")

# 1. Update the plugin ZIP file
plugin_php = os.path.join(plugin_dir, "sss-speleo-map.php")
plugin_zip = os.path.join(plugin_dir, "sss-speleo-map-plugin.zip")
with zipfile.ZipFile(plugin_zip, "w", zipfile.ZIP_DEFLATED) as z:
    z.write(plugin_php, arcname="sss-speleo-map/sss-speleo-map.php")
print(f"Updated plugin zip: {plugin_zip}")

# 2. Build the project
print("Building Vite production package...")
res = subprocess.run(["npm", "run", "build", "--prefix", "apps/web"], cwd=root_dir, capture_output=True, text=True, shell=True)
print(res.stdout)
if res.returncode != 0:
    print("Build failed:", res.stderr)
    exit(1)

# Ensure .htaccess is in dist
htaccess_src = os.path.join(web_dir, "public", ".htaccess")
htaccess_dst = os.path.join(dist_dir, ".htaccess")
if os.path.exists(htaccess_src):
    shutil.copy2(htaccess_src, htaccess_dst)
    print(f"Copied .htaccess to {htaccess_dst}")

# 3. Create the production ZIP archive for WebFTP deployment
output_zip_path = os.path.join(root_dir, "kluby-sss-sk-production.zip")
print(f"Creating production archive: {output_zip_path}...")

with zipfile.ZipFile(output_zip_path, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            file_path = os.path.join(root, file)
            # relative path inside zip
            arcname = os.path.relpath(file_path, dist_dir)
            zipf.write(file_path, arcname)
            print(f"  + {arcname}")

print(f"\nSUCCESS: Production package ready at: {output_zip_path}")
print(f"File size: {os.path.getsize(output_zip_path):,} bytes")
