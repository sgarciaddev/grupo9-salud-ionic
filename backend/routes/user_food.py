from flask import Blueprint, request, jsonify
from app import query
from responses import *
from constants import FOOD_UNITS
from routes.user_health import get_recommended_calories


bp = Blueprint('user_food', __name__)

@bp.route('/user/food', methods=['GET'])
def get_user_food():
    id = request.args.get('id')
    
    if not id:
        return not_found_error('id')
    
    try:
        id = int(id)
    except ValueError:
        return not_int_error('id')
    
    try:
        data = query(f"SELECT nombre, calorias, cantidad, unidad FROM alimentosUsuario JOIN alimentos using(idAlimento) WHERE alimentosUsuario.idUsuario={id} AND DATE(fecha) = CURDATE()")
        recommended, dev = get_recommended_calories(id)
    except Exception as e:
        print(e)
        return bd_error()
    
    food_list = []
    total = 0
    for food in data:
        item = {
            "nombre": food['nombre'],
            "calorias": int(food['calorias'] * food['cantidad'] / 100),
            "cantidad": food['cantidad'],
            "unidad": FOOD_UNITS[food['unidad']]
        }
        food_list.append(item)
        total = total + item['calorias']

    return jsonify({
        "alimentos": food_list,
        "totalCalorias": total,
        "recomendado": recommended,
        "margen": dev
    })