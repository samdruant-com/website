# the purpose of this script is to automate the process of
# building, tagging and pushing the package images to the 
# docker registry.

curr_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

repo="thisoliver/sam"
packages=("server" "client")
sha=$(git rev-parse HEAD)

# for each package, build, tag and push the image
for package in "${packages[@]}"
do
    # Build the image (add support for arm architecture)
    docker build -t sam:$package $curr_dir/../packages/$package

    # Tag the image
    docker tag sam:$package $repo:$package
    docker tag sam:$package $repo:$package-$sha

    # Push the image
    docker push $repo:$package
    docker push $repo:$package-$sha
done
