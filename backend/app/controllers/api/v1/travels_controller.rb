class Api::V1::TravelsController < ApplicationController
  def index
    @travels = Travel.all
    serialized_travels = @travels.map do |travel|
      TravelSerializer.new(travel).serializable_hash[:data][:attributes] 
    render json: @travels
  end

  def show
    @travel = Travel.find(params[id])
    render json: @travel
  end

  def create
    @travel = Travel.new(travel_params)
    if @travel.save
      render json: @travel
    else
      render json: {errors: @travel.errors,message: "nao foi possivel cadastrar"},status: :unprocessable_entity
    end
    
  end

  def update
    @travel = Travel.find(params[:id])
    if @travel.update(travel_params)
      render json: @travel
    else
      render json: {message: "nao foi possivel atualizar"},status: :unprocessable_entity
    end
  end


  def destroy
    @travel = Travel.find(params[:id])
    @travel.destroy
    render json: {message: "Sua viagem foi deletada"}
  end

  private
    def travel_params
      params.require(:travel).permit(:nome, :data, :price, :desc, :image)
    end
end
