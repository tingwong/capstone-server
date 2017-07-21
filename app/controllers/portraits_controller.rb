class PortraitsController < ApplicationController

  def index
    files_sorted_by_time = Dir['/home/ubuntu/capstone/pix2pix-tensorflow/test-output/*'].sort_by{ |f| File.ctime(f) }.last(10)
    render status: :ok, json: {files: files_sorted_by_time}
  end

  def process_image
    # Unique naming for images

    file_name = SecureRandom.uuid + ".png"

    # Write binary image to file
    File.open("static/" + file_name,"wb") do |file|
      file.write(Base64.decode64(params[:canvasURL]))
    end

    # Resize canvas
    `python ../tools/dockrun.py python ../tools/process.py \
      --input_dir static \
      --operation resize \
      --output_dir ../test-resized/`

    # Process canvas to portrait
    `python ../tools/dockrun.py python ../server/tools/process-local.py \
      --model_dir ../models/#{params[:style]} \
      --input_file ../test-resized/#{file_name} \
      --output_file ../test-output/#{file_name}`

    # Combine canvas with portraits
    `python ../tools/dockrun.py python ../tools/process.py \
      --input_dir ../test-resized \
      --b_dir ../test-output/ \
      --operation combine \
      --output_dir ../before-after`

    # Send portrait-only back to front-end

    render status: :ok, json: {file_name: file_name, style: params[:style]}
  end

  private
  def image_params
    params.require(:canvasURL)
  end

end
